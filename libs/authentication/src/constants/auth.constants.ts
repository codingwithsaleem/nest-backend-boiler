import { TIME_5_MINUTES_MLS } from '@app/shared';

export const AUTH_LOGIN_ATTEMPT_LIMIT = 7;
export const AUTH_LOGIN_ATTEMPT_PERIOD = TIME_5_MINUTES_MLS;
export const AUTH_REFRESH_TOKEN_EXPIRATION = '3h';
export const AUTH_VERIFY_TOKEN_EXPIRATION = '1d';
export const AUTH_RECOVER_TOKEN_EXPIRATION = '6h';
export const AUTH_PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{12,32}$/;
export const AUTH_PASSWORD_REGEX_MESSAGE =
  'Password validation failed. Please ensure your password is between 12 and 32 characters long, includes at least one uppercase letter, one digit, and one special character or underscore (_).';
export const AUTH_CONFIRM_PASSWORD_HEADER = 'X-Confirm-Password';
export const AUTH_APPLICATION_NAME = 'Reskue API';

export const OAUTH_LINKEDIN_KEY = (state: string) => `linkedin-register-${state}`;
export const OAUTH_GOOGLE_KEY = (state: string) => `google-register-${state}`;
