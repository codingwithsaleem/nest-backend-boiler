import { Module } from '@nestjs/common';
import { LoggerService } from '@app/logger/logger.service';
import { ConfigModule } from '@nestjs/config';
import { validateLoggerEnvironment } from '@app/logger/environment/logger.environment.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validate: validateLoggerEnvironment,
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
