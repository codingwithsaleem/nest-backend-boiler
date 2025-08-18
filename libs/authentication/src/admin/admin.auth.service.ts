import {
  MAILING_RECOVER_ADMIN_TEMPLATE_ALIAS,
  MAILING_SENDER,
  MailingException,
  MailingService,
} from '@app/mailing';
import { AdminEntity, AdminRepository } from '@app/database';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BaseAuthService } from '@app/authentication/abstract/baseAuth.service';
import { MessageSendingResponse } from 'postmark/dist/client/models';
import { AuthService } from '@app/authentication/auth.service';
import { LoggerService } from '@app/logger';

/**
 * Service for admin authentication
 */
@Injectable()
export class AdminAuthService extends BaseAuthService<AdminEntity> {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    protected readonly repository: AdminRepository,
    protected readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly mailingService: MailingService,
    private readonly logger: LoggerService,
  ) {
    super(AdminEntity.AUTH_ENTITY_NAME, repository, jwtService);
  }

  /**
   * Send an admin account recovery email
   * @param email Email of the user
   * @returns MessageSendingResponse
   */
  public async sendRecoverEmail(email: string): Promise<MessageSendingResponse> {
    const admin = await this.repository.findOneOrFail({ email });
    const token = await this._generateRecoverToken(admin);
    return await this.mailingService.serverClient
      .sendEmailWithTemplate({
        From: `Reskue <${MAILING_SENDER}>`,
        To: admin.email,
        TemplateAlias: MAILING_RECOVER_ADMIN_TEMPLATE_ALIAS,
        TemplateModel: {
          name: 'Reskue Admin',
          to: admin.email,
          front_url: '', // TODO: BackOffice URL
          token,
        },
      })
      .catch(err => {
        const error = new MailingException('Unable to send recovery email', err);
        this.logger.error(error.message, error.stack, error);
        throw error;
      });
  }
}
