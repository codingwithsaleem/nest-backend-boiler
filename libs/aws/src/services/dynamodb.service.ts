import { AwsService } from '@app/aws/aws.service';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DynamodbService {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(private readonly awsService: AwsService) {}

  /*********************************** LIBRARY ******************************************/

  /*********************************** CLIENTS ******************************************/
  /**
   * Get AWS Dynamo DB client
   * @returns AWS Dynamo DB client
   */
  public get client(): DynamoDB {
    return new DynamoDB(this.awsService.client);
  }
}
