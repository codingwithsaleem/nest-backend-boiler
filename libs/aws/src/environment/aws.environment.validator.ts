import { AwsRegion } from '@app/aws/enums/awsRegion.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

// This class is used to do validation on the environment, same way as DTOs
export class AwsEnvironmentValidator {
  @IsEnum(AwsRegion)
  AWS_REGION: AwsRegion;

  @IsNotEmpty()
  AWS_ACCESS_KEY_ID: string;

  @IsNotEmpty()
  AWS_SECRET_ACCESS_KEY: string;

  @IsNotEmpty()
  AWS_PUBLIC_BUCKET_NAME: string;
}
