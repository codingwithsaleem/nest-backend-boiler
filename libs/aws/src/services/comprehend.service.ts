import { AwsService } from '@app/aws/aws.service';
import { AwsRegion } from '@app/aws/enums/awsRegion.enum';
import { Comprehend } from '@aws-sdk/client-comprehend';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ComprehendService {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(private readonly awsService: AwsService) {}

  /*********************************** LIBRARY ******************************************/

  /*********************************** CLIENTS ******************************************/
  /**
   * Get comprehend client
   * @returns Comprehend client
   */
  public get client(): Comprehend {
    return new Comprehend({
      ...this.awsService.client,
      // Comprehend is not supported in the EU_WEST_3 region
      region: AwsRegion.EU_WEST_2,
    });
  }
}
