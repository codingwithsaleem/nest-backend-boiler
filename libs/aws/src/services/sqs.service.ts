import { AwsService } from '@app/aws/aws.service';
import {
  SQSClient,
  SendMessageCommand,
  SendMessageCommandInput,
  SendMessageCommandOutput,
} from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { Consumer, ConsumerOptions } from 'sqs-consumer';

@Injectable()
export class SqsService {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(private readonly awsService: AwsService) {}

  /*********************************** LIBRARY ******************************************/
  /**
   * The queue is polled continuously for messages using long polling
   * @param options Aws SQS consumer options
   * @returns Created consumer
   */
  public createConsumer(options: Omit<ConsumerOptions, 'sqs' | 'region'>): Consumer {
    return Consumer.create({
      ...options,
      sqs: this.client,
    });
  }

  /**
   * Send a message to the given queue
   * @param message Message input to send
   * @returns SendMessageCommandOutput
   */
  public async sendMessage(
    message: SendMessageCommandInput,
  ): Promise<SendMessageCommandOutput> {
    const command = new SendMessageCommand(message);
    return await this.client.send(command);
  }

  /*********************************** CLIENTS ******************************************/
  /**
   * Get AWS SQS client
   * @returns AWS SQS client
   */
  public get client(): SQSClient {
    return new SQSClient(this.awsService.client);
  }
}
