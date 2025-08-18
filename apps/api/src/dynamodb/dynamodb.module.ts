import { Module } from '@nestjs/common';
import { DynamodbService } from './dynamodb.service';
import { DynamodbController } from './dynamodb.controller';
import { AwsModule } from '@app/aws';

@Module({
  imports: [AwsModule],
  providers: [DynamodbService],
  controllers: [DynamodbController],
  exports: [DynamodbService],
})
export class DynamodbModule {}
