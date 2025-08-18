import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateRedisEnvironment } from '@app/redis/environment/redis.environment.validation';
import { RedisService } from '@app/redis/redis.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validate: validateRedisEnvironment,
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
