import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LinkedInRegistrationOauthGuard extends AuthGuard(
  'user-linkedin-registration-strategy',
) {}
