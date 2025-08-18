import { Module } from '@nestjs/common';
import { S3Service } from './services/s3.service';
import { ComprehendService } from './services/comprehend.service';
import { ConfigModule } from '@nestjs/config';
import { validateAwsEnvironment } from '@app/aws/environment/aws.environment.validation';
import { AwsService } from '@app/aws/aws.service';
import { SecretsManagerService } from '@app/aws/services/secrets-manager.service';
import { SqsService } from '@app/aws/services/sqs.service';
import { DynamodbService } from '@api/dynamodb/dynamodb.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validate: validateAwsEnvironment,
    }),
  ],
  providers: [
    AwsService,
    S3Service,
    ComprehendService,
    DynamodbService,
    SecretsManagerService,
    SqsService,
  ],
  exports: [
    AwsService,
    S3Service,
    ComprehendService,
    DynamodbService,
    SecretsManagerService,
    SqsService,
  ],
})
export class AwsModule {}
