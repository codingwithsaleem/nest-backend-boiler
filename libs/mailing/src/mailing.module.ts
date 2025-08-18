import { AwsModule } from '@app/aws';
import { validateMailingEnvironment } from '@app/mailing/environment/mailing.environment.validation';
import { MailingService } from '@app/mailing/mailing.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@app/logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validate: validateMailingEnvironment,
    }),
    AwsModule,
    LoggerModule,
  ],
  providers: [MailingService],
  exports: [MailingService],
})
export class MailingModule {}
