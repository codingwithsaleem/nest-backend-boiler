import {
  AUTH_LOGIN_ATTEMPT_LIMIT,
  AUTH_LOGIN_ATTEMPT_PERIOD,
} from '@app/authentication/constants/auth.constants';
import {
  AuthenticationException,
  LoginAttempsExceededException,
} from '@app/authentication/exceptions/auth.exceptions';
import { UserAuthService } from '@app/authentication/user/user.auth.service';
import { UserEntity } from '@app/database';
import { RedisService } from '@app/redis';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class UserLoginStrategy extends PassportStrategy(Strategy, 'UserLoginStrategy') {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    private readonly authenticationService: UserAuthService,
    private readonly redisService: RedisService,
  ) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  /**
   *
   * @param email
   * @param value
   */
  async setAttempts(email: string, value: number) {
    await this.redisService.set(
      `user-connexion-attempts-${email}`,
      value,
      AUTH_LOGIN_ATTEMPT_PERIOD,
    );
  }
  /**
   * Validate user login
   * @param email Email
   * @param password Password
   * @returns User if success
   * @throws If login fails or if attempts exceeded
   */
  async validate(email: string, password: string): Promise<UserEntity> {
    const attempts: number = await this.redisService.get(
      `user-connexion-attempts-${email}`,
    );
    if (attempts && attempts >= AUTH_LOGIN_ATTEMPT_LIMIT) {
      await this.setAttempts(email, attempts + 1);
      throw new LoginAttempsExceededException();
    }
    const user = await this.authenticationService.validate(email, password);
    if (!user) {
      await this.setAttempts(email, attempts ? attempts + 1 : 1);
      throw new AuthenticationException();
    }
    return user;
  }
}
