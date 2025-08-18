import { Injectable } from '@nestjs/common';
import { AccountClient, ServerClient } from 'postmark';
import { ConfigService } from '@nestjs/config';
import { MailingEnvironmentValidator } from '@app/mailing/environment/mailing.environment.validator';
import { LoggerService } from '@app/logger';

@Injectable()
export class MailingService {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    private readonly configService: ConfigService<MailingEnvironmentValidator, true>,
    private readonly logger: LoggerService,
  ) {}

  /*********************************** CLIENTS ******************************************/
  /**
   * Get mailing configuration
   * @returns Mailing configuration
   */
  public get config() {
    return {
      serverToken: this.configService.get('POSTMARK_SERVER_API_KEY', {
        infer: true,
      }),
      accountToken: this.configService.get('POSTMARK_ACCOUNT_API_KEY', {
        infer: true,
      }),
    };
  }

  /**
   * Get Postmark account client.
   * @returns Postmark account client
   */
  public get accountClient(): AccountClient {
    return new AccountClient(this.config.accountToken, {
      useHttps: true,
    });
  }

  /**
   * Get postmark server client.
   * @returns Postmark server client
   */
  public get serverClient(): ServerClient {
    return new ServerClient(this.config.serverToken, {
      useHttps: true,
    });
  }
}
