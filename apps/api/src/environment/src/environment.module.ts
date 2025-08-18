import { EnvironmentService } from '@api/environment/src/environment.service';
import { validateEnvironment } from '@api/environment/src/validation/environment.validation';
import { LoggerModule } from '@app/logger';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnvironment,
    }),
    LoggerModule,
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
