import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { Redis } from 'ioredis';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  /**
   * Connect adapter to Redis
   * @param pubClient Redis publisher
   * @param subClient Redis Subscriber
   */
  async connectToRedis(pubClient: Redis, subClient: Redis): Promise<void> {
    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  /**
   * Create socketIO server
   * @param port Port to listen
   * @param options SocketIO server options
   * @returns Created SocketIO server
   */
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
