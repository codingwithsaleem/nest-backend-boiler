import { TodoModule } from './todo/todo.module';
import { AppController } from '@api/app.controller';
import { EnvironmentModule } from '@api/environment/src/environment.module';
import { AuthModule } from '@app/authentication';
import { RedisModule } from '@app/redis';
import { DatabaseModule } from '@app/database';
import { CustomRequestContext } from '@app/shared';
import { RequestContextModule } from '@medibloc/nestjs-request-context';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { SocketIoModule } from '@app/socket-io';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from '@app/logger';
import { UserModule } from './user/user.module';
import { DynamodbModule } from './dynamodb/dynamodb.module';

@Module({
  imports: [
    // Libs
    RedisModule,
    SocketIoModule,
    DatabaseModule,
    AuthModule,
    LoggerModule,
    // Modules
    RequestContextModule.forRoot({
      contextClass: CustomRequestContext,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    EnvironmentModule,
    UserModule,
    DynamodbModule,
    TodoModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
