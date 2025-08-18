import {
  AUTH_APPLICATION_NAME,
  AUTH_RECOVER_TOKEN_EXPIRATION,
  AUTH_REFRESH_TOKEN_EXPIRATION,
  AUTH_VERIFY_TOKEN_EXPIRATION,
} from '@app/authentication/constants/auth.constants';
import { TfaConfigurationException } from '@app/authentication/exceptions/auth.exceptions';
import {
  AuthTokens,
  AuthTokensWithTFWords,
  JwtLoginPayload,
  JwtRecoverPayload,
  JwtVerifyPayload,
} from '@app/authentication/types/auth.types';
import { AuthenticatedEntity, CrudRepository } from '@app/database';
import { EntityRepository, FilterQuery } from '@mikro-orm/core';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { rword } from 'rword';
import internal from 'stream';

/** Authentication service template */
export abstract class BaseAuthService<T extends AuthenticatedEntity> {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    protected readonly entityName: string,
    protected readonly repository: EntityRepository<T> | CrudRepository<T>,
    protected readonly jwtService: JwtService,
  ) {}

  /**
   * Login validation
   * @param email - the user email
   * @param password - the user password
   * @returns The target entity, otherwise null
   */
  public async validate(email: string, password: string): Promise<T | null> {
    const target = await this.repository.findOne({ email } as FilterQuery<T>);
    if (target && (await compare(password, target.password))) {
      return target;
    }
    return null;
  }

  /**
   * Generate access token
   * @param payload The JWT payload
   * @returns An access token
   */
  private async _generateAccessToken(payload: JwtLoginPayload): Promise<string> {
    return await this.jwtService.signAsync(instanceToPlain(payload));
  }

  /**
   * Generate refresh token
   * @dev Fires native update query, no subscriber will be triggered on update
   * @param payload The JWT payload
   * @returns A refresh token
   */
  private async _generateRefreshToken(payload: JwtLoginPayload): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(instanceToPlain(payload), {
      expiresIn: AUTH_REFRESH_TOKEN_EXPIRATION,
    });
    await this.repository.nativeUpdate(
      { id: payload.targetId } as FilterQuery<T>,
      {
        refreshToken: await hash(refreshToken, 10),
      } as T,
    );
    return refreshToken;
  }

  /**
   * Generate access and refresh token
   * @param target The target entity
   * @param isTFA Whether the target has two-factor authentication enabled
   * @returns An access and refresh token
   */
  public async generateTokens(target: T, isTFA = false): Promise<AuthTokens> {
    const payload = new JwtLoginPayload(target.id, this.entityName, isTFA);
    const accessToken = await this._generateAccessToken(payload);
    const refreshToken = await this._generateRefreshToken(payload);
    if (!target.TFAEnabled || (target.TFAEnabled && isTFA)) {
      return { accessToken, refreshToken, TFARequired: false };
    }
    return { accessToken, refreshToken, TFARequired: true };
  }

  /**
   * Generate two factor authentication secret
   * @dev Fires native update query, no subscriber will be triggered on update
   * @param target The target entity
   * @returns Two factor authentication secret
   */
  public async generateTwoFaSecret(target: T): Promise<string> {
    if (target.TFAEnabled) {
      throw new TfaConfigurationException('Two-factor authentication is already enabled');
    }
    const secret = authenticator.generateSecret();
    const otpAuthUrl = authenticator.keyuri(target.email, AUTH_APPLICATION_NAME, secret);
    await this.repository.nativeUpdate(
      { id: target.id } as FilterQuery<T>,
      {
        TFASecret: secret,
      } as T,
    );
    return otpAuthUrl;
  }

  /**
   * Pipe the TFA QR code stream as PNG
   * @param stream QR code stream
   * @param otpAuthUrl Url of the QR code
   */
  public async pipeQrCodeStream(stream: internal.Writable, otpAuthUrl: string) {
    await toFileStream(stream, otpAuthUrl);
  }

  /**
   * Determine whether the two-factor token is valid
   * @param target Target entity
   * @param token Two-factor token
   * @returns true if the token is valid otherwise false
   */
  public isTwoFaTokenValid(target: T, token: string) {
    if (!target.TFASecret) {
      throw new TfaConfigurationException('Please generate a secret first');
    }
    return authenticator.verify({
      token,
      secret: target.TFASecret,
    });
  }

  /**
   * Turn on two-factor authentication
   * @dev Fires native update query, no subscriber will be triggered on update
   * @param target Target entity
   * @param token Two-factor token
   * @returns Two-factor authentication words and tokens
   */
  public async turnOnTwoFa(target: T, token: string): Promise<AuthTokensWithTFWords> {
    if (target.TFAEnabled) {
      throw new TfaConfigurationException('Two-factor authentication is already enabled');
    } else if (!this.isTwoFaTokenValid(target, token)) {
      throw new TfaConfigurationException('Wrong authentication code');
    }
    const TFARecoveryWords = rword.generate(12).toString().replaceAll(',', ' ');
    await this.repository.nativeUpdate(
      { id: target.id } as FilterQuery<T>,
      {
        TFAEnabled: true,
        TFARecoveryWords: await hash(TFARecoveryWords, 10),
      } as T,
    );
    const tokens = await this.generateTokens(target, true);
    return { TFARecoveryWords, ...tokens };
  }

  /**
   * Turn off two-factor authentication
   * @dev Fires native update query, no subscriber will be triggered on update
   * @param target Target entity
   */
  public async turnOffTwoFa(target: T) {
    if (!target.TFAEnabled) {
      throw new TfaConfigurationException('Two-factor authentication is disabled');
    }
    await this.repository.nativeUpdate(
      { id: target.id } as FilterQuery<T>,
      {
        TFAEnabled: false,
        TFASecret: null,
        TFARecoveryWords: null,
      } as T,
    );
  }

  /**
   * Login with two-factor authentication.
   * @dev If the token passed is invalid but matches the recovery key,
   * two-factor authentication is automatically disabled
   * @param target Target entity
   * @param token Two-factor token
   * @returns Two-factor authentication tokens
   */
  async loginWithTwoFa(target: T, token: string) {
    if (!target.TFAEnabled) {
      throw new TfaConfigurationException('Two-factor authentication is disabled');
    } else if (!this.isTwoFaTokenValid(target, token)) {
      if (await compare(token, target.TFARecoveryWords)) {
        await this.turnOffTwoFa(target);
        return await this.generateTokens(target, false);
      } else {
        throw new TfaConfigurationException('Wrong authentication code');
      }
    }
    return await this.generateTokens(target, true);
  }

  /**
   * Logout the target
   * @dev Fires native update query, no subscriber will be triggered on update
   * @dev Removes the refresh token from the database
   * @param target Target entity
   */
  async logout(target: T): Promise<void> {
    await this.repository.nativeUpdate(
      { id: target.id } as FilterQuery<T>,
      { refreshToken: null } as T,
    );
  }

  /**
   * Generate the token used to recover a lost account, from an email address
   * @param target - The targeted user
   * @returns The token used to recover the account
   */
  protected async _generateRecoverToken(target: T): Promise<string> {
    const payload = new JwtRecoverPayload(target.id, this.entityName);
    return await this.jwtService.signAsync(instanceToPlain(payload), {
      expiresIn: AUTH_RECOVER_TOKEN_EXPIRATION,
    });
  }

  /**
   * Generate the token used to verify ownership of an email address
   * @param targetId Target entity ID
   * @param email Email address
   * @returns The token used to verify ownership of the email address
   */
  protected async _generateVerifyToken(targetId: string, email: string): Promise<string> {
    const target = await this.repository.findOneOrFail(targetId as FilterQuery<T>);
    const payload = new JwtVerifyPayload(target.id, this.entityName, email);
    return await this.jwtService.signAsync(instanceToPlain(payload), {
      expiresIn: AUTH_VERIFY_TOKEN_EXPIRATION,
    });
  }
}
