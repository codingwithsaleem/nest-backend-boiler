import {
  AUTH_PASSWORD_REGEX,
  AUTH_PASSWORD_REGEX_MESSAGE,
} from '@app/authentication/constants/auth.constants';
import { IsNotEmpty, Matches } from 'class-validator';

export class RecoverDto {
  /**
   * Recover token
   */
  @IsNotEmpty()
  token: string;

  /**
   * New password
   */
  @Matches(AUTH_PASSWORD_REGEX, { message: AUTH_PASSWORD_REGEX_MESSAGE })
  password: string;
}
