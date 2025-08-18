import { AUTH_CONFIRM_PASSWORD_HEADER } from '@app/authentication/constants/auth.constants';
import { InvalidPasswordException } from '@app/authentication/exceptions/auth.exceptions';
import { UserRequest } from '@app/authentication/types/auth.types';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

@Injectable()
export class ConfirmPasswordGuard implements CanActivate {
  /**
   *
   * @param context
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: UserRequest = context.switchToHttp().getRequest();
    if (!request.user) {
      return true;
    }
    const password: string = request.header(AUTH_CONFIRM_PASSWORD_HEADER);
    if (!password || !(await compare(password, request.user.password))) {
      throw new InvalidPasswordException('You must confirm your password');
    }
    return true;
  }
}
