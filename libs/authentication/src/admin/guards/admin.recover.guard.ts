import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminRecoverGuard extends AuthGuard('AdminRecoverStrategy') {}
