import { AuthService } from '@app/authentication/auth.service';
import { LinkedInProfile } from '@app/authentication/types/LinkedInProfile.type';
import { UserRepository } from '@app/database';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-linkedin-oauth2';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(
  Strategy,
  'user-linkedin-strategy',
) {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {
    super(authService.getLinkedInLoginConfig());
  }

  /**
   * Validates the LinkedIn authentication strategy.
   * @param req - The request object.
   * @param accessToken - The access token.
   * @param refreshToken - The refresh token.
   * @param profile - The LinkedIn profile.
   * @returns The user object found in the repository based on the profile email.
   */
  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: LinkedInProfile,
  ) {
    const user = await this.userRepository.findOne({ email: profile.email });
    if (!user) return { error: 'Failed to login, no user found' };
    return user;
  }
}
