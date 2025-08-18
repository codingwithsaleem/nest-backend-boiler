import { AwsEnvironmentValidator } from '@app/aws/environment/aws.environment.validator';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    private readonly configService: ConfigService<AwsEnvironmentValidator, true>,
  ) {}

  /**
   * AWS client configuration
   * @returns AWS client configuration
   */
  public get client() {
    return {
      region: this.configService.get('AWS_REGION', { infer: true }),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID', {
          infer: true,
        }),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY', {
          infer: true,
        }),
      },
    };
  }

  /**
   * AWS s3 configuration
   * @returns AWS s3 configuration
   */
  public get s3() {
    return {
      bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME', {
        infer: true,
      }),
    };
  }
}
