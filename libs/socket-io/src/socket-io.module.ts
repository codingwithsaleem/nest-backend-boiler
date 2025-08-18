import { Module } from '@nestjs/common';
import { SocketIoService } from './socket-io.service';
import { RedisModule } from '@app/redis';

@Module({
  imports: [RedisModule],
  providers: [SocketIoService],
  exports: [SocketIoService],
})
export class SocketIoModule {}
