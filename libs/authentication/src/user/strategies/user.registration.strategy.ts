import {
  InvalidTokenException,
  UserAlreadyRegisteredException,
} from '@app/authentication/exceptions/auth.exceptions';
import { JwtAction, JwtRegisterPayload } from '@app/authentication/types/auth.types';
import {
  MAILING_SENDER,
  MAILING_WELCOME_USER_TEMPLATE_ALIAS,
  MailingException,
  MailingService,
} from '@app/mailing';
import { UserEntity, UserRepository } from '@app/database';
import { ValidationException } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { hash } from 'bcrypt';
import { validateOrReject } from 'class-validator';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '@app/authentication/auth.service';
import { MessageSendingResponse } from 'postmark/dist/client/models';
import { LoggerService } from '@app/logger';
import { CreateUserDto } from '@app/authentication/dtos/CreateUser.dto';

@Injectable()
export class UserRegistrationStrategy extends PassportStrategy(
  Strategy,
  'UserRegistrationStrategy',
) {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailingService: MailingService,
    private readonly authService: AuthService,
    private readonly logger: LoggerService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('token'),
      secretOrKey: authService.createJwtOptions().secret,
      passReqToCallback: true,
    });
  }

  /**
   * Send a welcome email to a new user
   * @param user The new user
   * @returns Message sending response
   */
  public async sendUserWelcome(user: UserEntity): Promise<MessageSendingResponse> {
    return await this.mailingService.serverClient
      .sendEmailWithTemplate({
        From: `greeka <${MAILING_SENDER}>`,
        To: user.email,
        TemplateAlias: MAILING_WELCOME_USER_TEMPLATE_ALIAS,
        TemplateModel: {
          front_url: `${this.authService.frontUrl}/auth/login`,
          username: user.firstName,
          support_email: 'help@greeka.com',
        },
      })
      .catch(err => {
        const error = new MailingException('Unable to send welcome email', err);
        this.logger.error(error.message, error.stack, error);
        throw error;
      });
  }

  /**
   * Validate the Oauth Registration
   * @param request - the request object
   * @param payload - The JwtRegisterPayload
   * @returns - The User created
   */
  async validate(request: Request, payload: JwtRegisterPayload): Promise<UserEntity> {
    // The validation pipe being executed after the guard, we have to do the validation manually here
    const dto: CreateUserDto = request.body;
    await validateOrReject(dto).catch(err => {
      throw new ValidationException(err);
    });
    if (!payload || payload.action !== JwtAction.REGISTER) {
      throw new InvalidTokenException();
    } else if (await this.userRepository.exists({ email: payload.email })) {
      throw new UserAlreadyRegisteredException('User already exists');
    }
    const user = await this.userRepository.save({
      ...payload,
      ...dto,
      password: await hash(dto.password, 10),
    });
    this.sendUserWelcome(user);
    return user;
  }
}
