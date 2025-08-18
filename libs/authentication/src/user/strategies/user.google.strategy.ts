import { AuthService } from '@app/authentication/auth.service';
import { GoogleProfile } from '@app/authentication/types/GoogleProfile.type';
import { UserRepository } from '@app/database';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'user-google-strategy') {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {
    super(authService.getGoogleLoginConfig());
  }

  /**
   * Validates the Google authentication strategy.
   * @param req - The request object.
   * @param accessToken - The access token.
   * @param refreshToken - The refresh token.
   * @param profile - The Google profile.
   * @returns The user object found in the repository based on the profile email.
   */
  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
  ) {
    const user = await this.userRepository.findOne({ email: profile.email });
    if (!user) return { error: 'Failed to login, no user found' };
    return user;
  }
}
