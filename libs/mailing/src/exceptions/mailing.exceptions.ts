import { ApiBaseException, ApiErrorCode } from '@app/shared';
import { HttpStatus } from '@nestjs/common';

export class MailingException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'Failed to send email',
        code: ApiErrorCode.API_MAILING_ERROR,
        error,
        context,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
