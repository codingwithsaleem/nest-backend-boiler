import { ApiBaseException, ApiErrorCode } from '@app/shared';
import { HttpStatus } from '@nestjs/common';

export class AuthenticationException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'Authentication failed',
        code: ApiErrorCode.AUTHENTICATION_ERROR,
        error,
        context,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class LoginAttempsExceededException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'Login attempts exceeded',
        code: ApiErrorCode.AUTHENTICATION_LOGIN_ATTEMPT_EXCEEDED,
        error,
        context,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class InvalidTokenException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'Invalid token',
        code: ApiErrorCode.AUTHENTICATION_INVALID_TOKEN,
        error,
        context,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class TfaAuthenticationException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'Two-factor authentication failed',
        code: ApiErrorCode.AUTHENTICATION_TFA_FAILED,
        error,
        context,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class TfaConfigurationException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'Two-factor configuration error',
        code: ApiErrorCode.VALIDATION_TFA_CONFIG,
        error,
        context,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

export class UserAlreadyRegisteredException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'User registration exception',
        code: ApiErrorCode.AUTHENTICATION_USER_ALREADY_REGISTERED,
        error,
        context,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

export class InvalidPasswordException extends ApiBaseException {
  /**
   *
   * @param error
   * @param context
   */
  constructor(error?: string | object, context?: object) {
    super(
      {
        message: 'Invalid password',
        code: ApiErrorCode.VALIDATION_INVALID_PASSWORD,
        error,
        context,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
