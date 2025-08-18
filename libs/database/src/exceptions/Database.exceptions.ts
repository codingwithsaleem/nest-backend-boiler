import { HttpStatus } from '@nestjs/common';
import { ApiBaseException, ApiErrorCode } from '../../../shared/src';

export class DatabaseException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'Database exception',
        code: ApiErrorCode.DATABASE_ERROR,
        error,
        context,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class DatabaseValidationException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'Database validation exception',
        code: ApiErrorCode.DATABASE_VALIDATION,
        error,
        context,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class DatabaseDuplicateException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'Database duplicate exception',
        code: ApiErrorCode.DATABASE_DUPLICATE,
        error,
        context,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class DatabaseNullValueException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'Database null value exception',
        code: ApiErrorCode.DATABASE_NULL_VALUE,
        error,
        context,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class DatabaseForeignKeyException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'Database foreign key exception',
        code: ApiErrorCode.DATABASE_FOREIGN_KEY,
        error,
        context,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class DatabaseNotFoundException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'Database not found exception',
        code: ApiErrorCode.DATABASE_NOT_FOUND,
        error,
        context,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
