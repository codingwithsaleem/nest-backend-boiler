import { ApiBaseException, ApiErrorCode } from '@app/shared';
import { HttpStatus } from '@nestjs/common';

export class PostmarkApiException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'Failed to retrieve data from Postmark API',
        code: ApiErrorCode.API_POSTMARK_API_ERROR,
        error,
        context,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class PostmarkNotFoundException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'Postmark data not found',
        code: ApiErrorCode.API_POSTMARK_API_ERROR,
        error,
        context,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
