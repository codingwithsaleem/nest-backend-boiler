import { BaseErrorProps, ApiErrorCode } from '@app/shared/enums/errors.enums';
import { HttpException, HttpExceptionOptions, HttpStatus } from '@nestjs/common';

export abstract class ApiBaseException extends HttpException {
  /**
   *
   * @param response
   * @param status
   * @param options
   */
  constructor(
    response: BaseErrorProps,
    status: HttpStatus,
    options?: HttpExceptionOptions,
  ) {
    super(response, status, options);
  }
}

export class ApiException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error: string, context?: object) {
    super(
      {
        message: 'Api error',
        code: ApiErrorCode.API_ERROR,
        error,
        context,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class ApiContextException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error: string, context?: object) {
    super(
      {
        message: 'Api context error',
        code: ApiErrorCode.API_CONTEXT_ERROR,
        error,
        context,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class ValidationException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error: string, context?: object) {
    super(
      {
        message: 'Validation error',
        code: ApiErrorCode.VALIDATION_ERROR,
        error,
        context,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
