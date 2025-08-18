import { Request } from 'express';
import { ApiProperty } from '@nestjs/swagger';
import { AdminEntity, UserEntity } from '@app/database';
import { Socket } from 'socket.io';

export enum JwtAction {
  LOGIN = 'Login',
  REGISTER = 'Register',
  RECOVER = 'Recover',
  VERIFY = 'Verify',
}

export interface JwtPayload {
  action: JwtAction;
}

export interface JwtAuthPayload extends JwtPayload {
  targetId: string;
  targetType: string;
}

export class JwtLoginPayload implements JwtAuthPayload {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(
    public targetId: string,
    public targetType: string,
    public isTFA: boolean = false,
  ) {}
  action = JwtAction.LOGIN;
}

export class JwtRecoverPayload implements JwtAuthPayload {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(
    public targetId: string,
    public targetType: string,
  ) {}
  action = JwtAction.RECOVER;
}

export class JwtVerifyPayload implements JwtAuthPayload {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(
    public targetId: string,
    public targetType: string,
    public email: string,
  ) {}
  action = JwtAction.VERIFY;
}

export class AuthTokens {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  TFARequired: boolean;
}

export class AuthTokensWithTFWords extends AuthTokens {
  @ApiProperty()
  TFARecoveryWords: string;
}

export interface AdminRequest extends Request {
  user: AdminEntity;
}

export interface UserRequest extends Request {
  user: UserEntity;
}

export interface TargetedUserRequest<T extends object> extends UserRequest {
  target: T;
}

export interface UserWsRequest extends Socket {
  user: UserEntity;
}

export interface TargetedUserWsRequest<T extends object> extends UserWsRequest {
  target: T;
}

export class JwtRegisterPayload implements JwtPayload {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    public accountId: string,
    public email: string,
  ) {}
  action = JwtAction.REGISTER;
}
