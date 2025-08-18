import { AuthenticationEnvironmentValidator } from '@app/authentication/environment/auth.environment.validator';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    private readonly authConfig: ConfigService<AuthenticationEnvironmentValidator, true>,
  ) {}

  /**
   * Authentication configuration
   * @returns Authentication configuration
   */
  public createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.authConfig.get('AUTH_JWT_SECRET', { infer: true }),
      global: true,
      signOptions: {
        expiresIn: '1h',
      },
    };
  }

  /**
   * Get frontend url
   * @returns Frontend url
   */
  public get frontUrl() {
    return this.authConfig.get('FRONTEND_URL', {
      infer: true,
    });
  }

  /**
   * Get frontend url
   * @returns Frontend url
   */
  public get frontRecoverUrl() {
    return this.authConfig.get('FRONTEND_RECOVER_URL', {
      infer: true,
    });
  }

  /**
   * Retrieves the LinkedIn configuration object.
   * @returns The LinkedIn configuration object.
   */
  public getLinkedInLoginConfig() {
    return {
      clientID: this.authConfig.get('LINKEDIN_CLIENT_ID', { infer: true }),
      clientSecret: this.authConfig.get('LINKEDIN_PRIMARY_CLIENT_SECRET', {
        infer: true,
      }),
      callbackURL: `${this.authConfig.get('API_URL')}/auth/user/linkedin/login/redirect`,
      scope: ['openid', 'profile', 'email'],
      state: true,
      passReqToCallback: true,
    };
  }

  /**
   * Retrieves the LinkedIn configuration object.
   * @returns The LinkedIn configuration object.
   */
  public getLinkedInRegisterConfig() {
    return {
      clientID: this.authConfig.get('LINKEDIN_CLIENT_ID', { infer: true }),
      clientSecret: this.authConfig.get('LINKEDIN_PRIMARY_CLIENT_SECRET', {
        infer: true,
      }),
      callbackURL: `${this.authConfig.get(
        'API_URL',
      )}/auth/user/linkedin/register/redirect`,
      scope: ['openid', 'profile', 'email'],
      state: true,
      passReqToCallback: true,
    };
  }

  /**
   * Retrieves the Google configuration object.
   * @returns The Google configuration object.
   */
  public getGoogleLoginConfig() {
    return {
      clientID: this.authConfig.get('GOOGLE_CLIENT_ID', { infer: true }),
      clientSecret: this.authConfig.get('GOOGLE_PRIMARY_CLIENT_SECRET', { infer: true }),
      callbackURL: `${this.authConfig.get('API_URL')}/auth/user/google/login/redirect`,
      scope: ['profile', 'email', 'openid'],
      state: true,
      passReqToCallback: true,
    };
  }

  /**
   * Retrieves the Google configuration object.
   * @returns The Google configuration object.
   */
  public getGoogleRegisterConfig() {
    return {
      clientID: this.authConfig.get('GOOGLE_CLIENT_ID', { infer: true }),
      clientSecret: this.authConfig.get('GOOGLE_PRIMARY_CLIENT_SECRET', { infer: true }),
      callbackURL: `${this.authConfig.get('API_URL')}/auth/user/google/register/redirect`,
      scope: ['profile', 'email', 'openid'],
      state: true,
      passReqToCallback: true,
    };
  }
}
