import { AwsService } from '@app/aws/aws.service';
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SecretsManagerService {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(private readonly awsService: AwsService) {}

  /*********************************** LIBRARY ******************************************/
  /**
   * Get AWS Secrets Manager secret value
   * @param secretId Secret ID
   * @returns Secret value
   */
  public async getSecretValue<T = any>(secretId: string): Promise<T> {
    const command = new GetSecretValueCommand({ SecretId: secretId });
    const ret = await this.client.send(command);
    return JSON.parse(ret.SecretString) as T;
  }

  /*********************************** CLIENTS ******************************************/
  /**
   * Get AWS Secrets manager client
   * @returns AWS Secrets Manager client
   */
  public get client(): SecretsManagerClient {
    return new SecretsManagerClient(this.awsService.client);
  }
}
