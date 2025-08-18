import { AdminAuthService } from '@app/authentication/admin/admin.auth.service';
import {
  AUTH_LOGIN_ATTEMPT_LIMIT,
  AUTH_LOGIN_ATTEMPT_PERIOD,
} from '@app/authentication/constants/auth.constants';
import {
  AuthenticationException,
  LoginAttempsExceededException,
} from '@app/authentication/exceptions/auth.exceptions';
import { AdminEntity } from '@app/database';
import { RedisService } from '@app/redis';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class AdminLoginStrategy extends PassportStrategy(Strategy, 'AdminLoginStrategy') {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    private readonly authenticationService: AdminAuthService,
    private readonly redisService: RedisService,
  ) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  /**
   * Set connexion attempts in cache
   * @param email Email
   * @param value Attempt value
   */
  async setAttempts(email: string, value: number) {
    await this.redisService.set(
      `admin-connexion-attempts-${email}`,
      value,
      AUTH_LOGIN_ATTEMPT_PERIOD,
    );
  }

  /**
   * Validate admin login
   * @param email Email
   * @param password Password
   * @returns Admin if success
   * @throws If login fails or if attempts exceeded
   */
  async validate(email: string, password: string): Promise<AdminEntity> {
    const attempts: number = await this.redisService.get(
      `admin-connexion-attempts-${email}`,
    );
    if (attempts && attempts >= AUTH_LOGIN_ATTEMPT_LIMIT) {
      await this.setAttempts(email, attempts + 1);
      throw new LoginAttempsExceededException();
    }
    const admin = await this.authenticationService.validate(email, password);
    if (!admin) {
      await this.setAttempts(email, attempts ? attempts + 1 : 1);
      throw new AuthenticationException();
    }
    return admin;
  }
}
