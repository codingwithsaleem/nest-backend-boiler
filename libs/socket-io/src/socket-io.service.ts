import { RedisService } from '@app/redis';
import { INestApplication, Injectable } from '@nestjs/common';
import { RedisIoAdapter } from '@app/socket-io/adapters/RedisIoAdapter';

@Injectable()
export class SocketIoService {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(private readonly redisService: RedisService) {}

  /**
   * Create Redis adapter for SocketIO
   * @param app Current NestJs application
   * @returns Redis adapter
   */
  public createRedisAdapter(app: INestApplication): RedisIoAdapter {
    const adapter = new RedisIoAdapter(app);
    adapter.connectToRedis(this.redisService.publisher, this.redisService.subscriber);
    return adapter;
  }
}
