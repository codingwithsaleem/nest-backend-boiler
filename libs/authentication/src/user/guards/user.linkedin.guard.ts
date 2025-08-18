import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LinkedInOauthGuard extends AuthGuard('user-linkedin-strategy') {}
