import { UserWsRequest } from '@app/authentication/types/auth.types';
import { UserAuthService } from '@app/authentication/user/user.auth.service';
import { CreateRequestContext, MikroORM } from '@mikro-orm/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class UserWsGuard implements CanActivate {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    private readonly authService: UserAuthService,
    private readonly orm: MikroORM,
  ) {}

  /**
   * Authentication guard used on websocket events.
   * Requires a dedicated mikro-orm context
   * @param context Execution context
   * @returns True if the user is authenticated, false otherwise
   */
  @CreateRequestContext()
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: UserWsRequest = context.switchToWs().getClient();
      return await this.authService.validateWebsocketConnection(client);
    } catch (error) {
      throw new WsException(error);
    }
  }
}
