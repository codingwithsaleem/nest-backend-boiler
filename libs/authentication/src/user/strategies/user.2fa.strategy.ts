import {
  InvalidTokenException,
  TfaAuthenticationException,
} from '@app/authentication/exceptions/auth.exceptions';
import { JwtAction, JwtLoginPayload } from '@app/authentication/types/auth.types';
import { UserEntity, UserRepository } from '@app/database';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '@app/authentication/auth.service';

@Injectable()
export class UserTFAStrategy extends PassportStrategy(Strategy, 'UserTFAStrategy') {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authService.createJwtOptions().secret,
    });
  }

  /**
   * Validate user access token.
   * Checks if user is TFA enabled and if token is valid.
   * @param payload Decrypted JWT payload
   * @returns User if success
   * @throws {InvalidTokenException} if token is invalid
   * @throws {TfaAuthenticationException} if TFA is enabled but token has not been issued with TFA
   */
  async validate(payload: JwtLoginPayload): Promise<UserEntity> {
    if (
      !payload ||
      payload.targetType !== UserEntity.AUTH_ENTITY_NAME ||
      payload.action !== JwtAction.LOGIN
    ) {
      throw new InvalidTokenException();
    }
    const user = await this.userRepository
      .findOneOrFail({ id: payload.targetId })
      .catch(() => {
        throw new InvalidTokenException('User not found');
      });
    if (!user.TFAEnabled || payload.isTFA) {
      return user;
    }
    throw new TfaAuthenticationException('Two-factor authentication required');
  }
}
