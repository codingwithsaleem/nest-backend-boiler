import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerEnvironmentValidator } from '@app/logger/environment/logger.environment.validator';
import { ServerClient } from 'postmark';
import {
  LOGGER_EMAIL_SENDER,
  LOGGER_ERROR_TEMPLATE_ALIAS,
} from '@app/logger/constant/logger.constant';
import { LoggerLevel } from '@app/logger/types/logger.types';

/**
 * Logger service for Reskue application.
 */
@Injectable()
export class LoggerService extends ConsoleLogger {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  private _errorSubscribedEmails: string[] = [];
  private _warnSubscribedEmails: string[] = [];

  // eslint-disable-next-line jsdoc/require-jsdoc
  constructor(private readonly env: ConfigService<LoggerEnvironmentValidator, true>) {
    super();
    this._parseEmails();
  }

  /**
   * Logs an error message and sends an email notification.
   * @param message - The error message to be logged.
   * @param optionalParams - Optional parameters to be included in the error log.
   */
  public async error(
    message: string,
    ...optionalParams: [...any, string?]
  ): Promise<void> {
    //await this._sendEmail(message, LoggerLevel.ERROR, optionalParams);
    super.error(message, optionalParams);
  }

  /**
   * Logs a warning message.
   * @param message - The warning message to be logged.
   * @param optionalParams - Optional parameters to be included in the log message.
   */
  public async warn(
    message: string,
    ...optionalParams: [...any, string?]
  ): Promise<void> {
    //await this._sendEmail(message, LoggerLevel.WARN, optionalParams);
    super.error(message, optionalParams);
  }

  /**
   * Logs a error message and sends an email notification.
   * @param emails - The email addresses to send the error notification to.
   * @param message - The error message to be logged.
   * @param optionalParams - Optional parameters to be included in the error log.
   */
  public async alertDefinedEmails(
    emails: string[],
    message: string,
    optionalParams: [...any, string?],
  ): Promise<void> {
    if (emails?.length) {
      await this.emailClient.sendEmailWithTemplate({
        From: LOGGER_EMAIL_SENDER,
        To: emails.join(','),
        TemplateAlias: LOGGER_ERROR_TEMPLATE_ALIAS,
        TemplateModel: {
          level: LoggerLevel.ERROR,
          message,
          date: new Date().toLocaleString(),
          error: optionalParams[1] ? optionalParams[1].toString() : '',
          stack_trace: optionalParams[0] ? optionalParams[0].toString() : '',
        },
      });
    }
    super.error(message, optionalParams);
  }

  /**
   * Parses the email addresses for error and warning notifications.
   * Retrieves the email addresses from environment variables and splits them using ':' as a delimiter.
   * If there are warning email addresses, adds them to the list of error email addresses if they are not already included.
   */
  private _parseEmails(): void {
    const errorEmails = this.env.get('LOGGER_ERROR_EMAILS', { infer: true })?.split(':');
    const warnEmails = this.env.get('LOGGER_WARN_EMAILS', { infer: true })?.split(':');
    if (warnEmails) {
      this._warnSubscribedEmails = warnEmails;
    }
    if (errorEmails) {
      this._errorSubscribedEmails = errorEmails;
      if (warnEmails) {
        for (const warnEmail of warnEmails) {
          if (!errorEmails.includes(warnEmail)) {
            this._errorSubscribedEmails.push(warnEmail);
          }
        }
      }
    }
  }

  /**
   * Sends an email with the specified message and level.
   * @param message - The message to be included in the email.
   * @param level - The level of the log message ('error' or 'warn').
   * @param optionalParams - Optional parameters to be included in the email.
   */
  private async _sendEmail(
    message: string,
    level: LoggerLevel,
    ...optionalParams: [...any, string?]
  ): Promise<void> {
    const To = this._getRecipients(level);
    if (!To?.length) return;
    await this.emailClient.sendEmailWithTemplate({
      From: LOGGER_EMAIL_SENDER,
      To,
      TemplateAlias: LOGGER_ERROR_TEMPLATE_ALIAS,
      TemplateModel: {
        level,
        message,
        date: new Date().toLocaleString(),
        error: optionalParams[1] ? optionalParams[1].toString() : '',
        stack_trace: optionalParams[0] ? optionalParams[0].toString() : '',
      },
    });
  }

  /**
   * Get logger email recipients
   * @param level Log level
   * @returns Recipients list
   */
  private _getRecipients(level: LoggerLevel): string {
    switch (level) {
      case LoggerLevel.ERROR:
        return this._errorSubscribedEmails.join(',');
      case LoggerLevel.WARN:
        return this._warnSubscribedEmails.join(',');
    }
  }

  /**
   * Get postmark server client.
   * @returns Postmark server client
   */
  public get emailClient(): ServerClient {
    return new ServerClient(this.env.get('POSTMARK_SERVER_API_KEY'), {
      useHttps: true,
    });
  }
}
