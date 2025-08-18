import { AwsModule } from '@app/aws';
import { LoggerModule } from '@app/logger';
import { validateStorageEnvironment } from '@app/storage/environment/storage.environment.validation';
import { MultipartFormFilesPipe } from '@app/storage/pipes/MultipartFiles.pipe';
import { StorageService } from '@app/storage/storage.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validate: validateStorageEnvironment,
    }),
    AwsModule,
    LoggerModule,
  ],
  providers: [StorageService, MultipartFormFilesPipe],
  exports: [StorageService, MultipartFormFilesPipe],
})
export class StorageModule {}
