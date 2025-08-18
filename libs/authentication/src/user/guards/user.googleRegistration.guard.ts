import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleRegistrationOauthGuard extends AuthGuard(
  'user-google-registration-strategy',
) {}
