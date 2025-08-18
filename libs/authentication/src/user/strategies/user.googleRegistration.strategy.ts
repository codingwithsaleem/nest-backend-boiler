import { AuthService } from '@app/authentication/auth.service';
import { GoogleProfile } from '@app/authentication/types/GoogleProfile.type';
import { SearchPreferenceRepository, UserEntity, UserRepository } from '@app/database';
import { LoggerService } from '@app/logger';
import {
  MAILING_LOGIN_URL,
  MAILING_PRODUCT_NAME,
  MAILING_SENDER,
  MAILING_SUPPORT,
  MAILING_WELCOME_USER_TEMPLATE_ALIAS,
  MailingException,
  MailingService,
} from '@app/mailing';
import { RedisService } from '@app/redis';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-google-oauth2';
import { MessageSendingResponse } from 'postmark/dist/client/models';

@Injectable()
export class GoogleRegistrationStrategy extends PassportStrategy(
  Strategy,
  'user-google-registration-strategy',
) {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailingService: MailingService,
    private readonly authService: AuthService,
    private readonly redis: RedisService,
    private readonly searchPreferenceRepository: SearchPreferenceRepository,
    private readonly logger: LoggerService,
  ) {
    super(authService.getGoogleRegisterConfig());
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
          sender_email: MAILING_SENDER,
          login_url: MAILING_LOGIN_URL,
          product_name: MAILING_PRODUCT_NAME,
          username: user.firstName,
          email: user.email,
          support_email: MAILING_SUPPORT,
        },
      })
      .catch(err => {
        const error = new MailingException('Unable to send welcome email', err);
        this.logger.error(error.message, error.stack, error);
        throw error;
      });
  }

  /**
   * Validates the google registration strategy.
   * @param req - The request object.
   * @param accessToken - The access token.
   * @param refreshToken - The refresh token.
   * @param profile - The google profile.
   * @returns The validated user.
   * @throws BadRequestException if no data is found.
   */
  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
  ) {
    try {
      const user = await this.userRepository.findOrCreate(
        { email: profile.email },
        {
          email: profile.email,
          firstName: profile.given_name,
          lastName: profile?.family_name || '',
          refreshToken,
        },
      );
      await this.userRepository.flush();
      await this.sendUserWelcome(user);
      return user;
    } catch (error) {
      this.logger.warn(error);
    }
  }
}
