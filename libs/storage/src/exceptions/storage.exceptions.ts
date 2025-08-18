import { ApiBaseException, ApiErrorCode } from '@app/shared';
import { HttpStatus } from '@nestjs/common';

export class FileNotFoundException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'File not found',
        code: ApiErrorCode.VALIDATION_FILE_NOT_FOUND,
        error,
        context,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class FileTooLargeException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'File too large',
        code: ApiErrorCode.VALIDATION_FILE_TOO_LARGE,
        error,
        context,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class InvalidFileException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'Invalid file',
        code: ApiErrorCode.VALIDATION_FILE_INVALID,
        error,
        context,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class FileUploadException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'File upload failed',
        code: ApiErrorCode.API_FILE_UPLOAD,
        error,
        context,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class FileDeletionException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'File deletion failed',
        code: ApiErrorCode.API_FILE_DELETION,
        error,
        context,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class FileDownloadException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'File upload failed',
        code: ApiErrorCode.API_FILE_DOWNLOAD,
        error,
        context,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
