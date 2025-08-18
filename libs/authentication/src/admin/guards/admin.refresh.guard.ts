import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminRefreshGuard extends AuthGuard('AdminRefreshStrategy') {}
