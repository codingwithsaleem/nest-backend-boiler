import {
  MAILING_PRODUCT_NAME,
  MAILING_RECOVER_USER_TEMPLATE_ALIAS,
  MAILING_SENDER,
  MAILING_SUPPORT,
  MAILING_VERIFY_USER_TEMPLATE_ALIAS,
  MailingException,
  MailingService,
} from '@app/mailing';
import { SearchPreferenceRepository, UserEntity, UserRepository } from '@app/database';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessageSendingResponse } from 'postmark/dist/client/models';
import { BaseAuthService } from '@app/authentication/abstract/baseAuth.service';
import { AuthService } from '@app/authentication/auth.service';
import { WsException } from '@nestjs/websockets';
import {
  AuthenticationException,
  UserAlreadyRegisteredException,
} from '@app/authentication/exceptions/auth.exceptions';
import {
  AuthTokens,
  JwtAction,
  JwtLoginPayload,
  UserRequest,
  UserWsRequest,
} from '@app/authentication/types/auth.types';
import { LoggerService } from '@app/logger';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { EnvironmentValidator } from '@api/environment/src/validation/environment.validator';
import { CreateUserDto } from '@app/authentication/dtos/CreateUser.dto';
import { hash } from 'bcrypt';

/**
 * Service for user authentication
 */
@Injectable()
export class UserAuthService extends BaseAuthService<UserEntity> {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    protected readonly repository: UserRepository,
    protected readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly mailingService: MailingService,
    private readonly logger: LoggerService,
    private readonly searchPreferenceRepository: SearchPreferenceRepository,
    private readonly config: ConfigService<EnvironmentValidator, true>,
  ) {
    super(UserEntity.AUTH_ENTITY_NAME, repository, jwtService);
  }

  /**
   * The OAuth redirection that set token into cookies and redirect toward the board page
   * @param user - The user
   * @param res - the response object
   */
  public async OAuthRedirection(user: UserEntity, res: Response): Promise<void> {
    const token = await this.generateTokens(user);
    const queryParams = `accessToken=${token.accessToken}&refreshToken=${token.refreshToken}&TFARequired=${token.TFARequired}`;
    const redirectionUrl = `${this.config.get('FRONTEND_URL_REDIRECTION_PROFILE', {
      infer: true,
    })}?${queryParams}`;
    res.redirect(redirectionUrl);
  }

  /**
   * Redirect to registration page if user is not found
   * @param res - the response object
   * @param req - the request object
   */
  public redirectToRegistration(res: Response, req: UserRequest) {
    const redirectUrl = `${this.config.get('FRONTEND_URL')}/auth/signup?error=
    ${req.user['error']}`;
    res.redirect(redirectUrl);
  }

  /**
   * Send a user account recovery email
   * @param email Email of the user
   * @returns MessageSendingResponse
   */
  public async sendRecoverEmail(email: string): Promise<MessageSendingResponse> {
    const user = await this.repository.findOneOrFail({ email });
    const token = await this._generateRecoverToken(user);
    return await this.mailingService.serverClient
      .sendEmailWithTemplate({
        From: `greeka <${MAILING_SENDER}>`,
        To: user.email,
        TemplateAlias: MAILING_RECOVER_USER_TEMPLATE_ALIAS,
        TemplateModel: {
          to: user.email,
          front_url: this.authService.frontRecoverUrl,
          token,
          support_url: MAILING_SUPPORT,
        },
      })
      .catch(err => {
        const error = new MailingException('Unable to send recovery email', err);
        this.logger.error(error.message);
        throw error;
      });
  }

  /**
   * Authentication routine used on websocket events.
   * @param client Webscoket client
   * @returns True if the user is authenticated, false otherwise
   */
  public async validateWebsocketConnection(client: UserWsRequest): Promise<boolean> {
    const bearer = client.handshake?.headers?.authorization?.split(' ')[1];
    if (!bearer) throw new WsException(new AuthenticationException('Bearer not found'));
    let payload: JwtLoginPayload;
    try {
      payload = this.jwtService.verify(bearer);
    } catch (error) {
      throw new WsException(new AuthenticationException('Invalid token'));
    }
    if (
      !payload ||
      payload.targetType !== UserEntity.AUTH_ENTITY_NAME ||
      payload.action !== JwtAction.LOGIN
    ) {
      throw new WsException(new AuthenticationException('Invalid token'));
    }
    const user = await this.repository.findOneOrFail(payload.targetId).catch(() => {
      throw new WsException(new AuthenticationException('User not found'));
    });
    if (!user.TFAEnabled || payload.isTFA) {
      client.user = user;
      return true;
    }
    throw new WsException(
      new AuthenticationException('Two-factor authentication required'),
    );
  }

  /**
   * Registers a new user.
   * @param dto - The registration data.
   * @returns A promise that resolves to the generated authentication tokens.
   * @throws UserAlreadyRegisteredException if the user with the provided email already exists.
   */
  public async register(dto: CreateUserDto): Promise<void> {
    const user = await this.repository.exists({ email: dto.email });
    if (user) throw new UserAlreadyRegisteredException('User already exists');
    const payload = { ...dto, password: await hash(dto.password, 10) };

    const jwt = await this.jwtService.signAsync(payload);

    const validationUrl = `${this.config.get('FRONTEND_URL')}/auth/verify?token=${jwt}`;

    await this.mailingService.serverClient.sendEmailWithTemplate({
      From: `greeka <${MAILING_SENDER}>`,
      To: dto.email,
      TemplateAlias: MAILING_VERIFY_USER_TEMPLATE_ALIAS,
      TemplateModel: {
        verify_url: validationUrl,
        product_name: MAILING_PRODUCT_NAME,
        username: dto.firstName,
        email: dto.email,
        support_email: MAILING_SUPPORT,
      },
    });
  }

  /**
   * Verify the user account creation via the URL sent by email
   * If the user is valid, create a new user in DB
   * @param token - The JWT from Url verification
   * @returns - AuthTokens
   */
  public async verify(token: string): Promise<AuthTokens> {
    const jwtDecoded: CreateUserDto = await this.jwtService.decode(token);
    const user = await this.repository.exists({ email: jwtDecoded.email });
    if (user) throw new UserAlreadyRegisteredException('User already exists');
    const newUser = await this.repository.findOrCreate(
      { email: jwtDecoded.email },
      {
        ...jwtDecoded,
        password: jwtDecoded.password,
      },
    );
    await this.repository.flush();
    return await this.generateTokens(newUser);
  }
}
