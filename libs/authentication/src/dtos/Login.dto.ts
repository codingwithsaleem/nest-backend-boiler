/**
 * @dev This DTO being used in guards,
 * the validation is executed post authentication.
 * No decorator is therefore required here.
 */
export class LoginDto {
  /**
   * Email
   */
  email: string;

  /**
   * Password
   */
  password: string;
}
