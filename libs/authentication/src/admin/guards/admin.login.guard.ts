import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminLoginGuard extends AuthGuard('AdminLoginStrategy') {}
