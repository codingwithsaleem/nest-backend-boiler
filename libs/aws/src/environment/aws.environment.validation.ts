import { AwsEnvironmentValidator } from '@app/aws/environment/aws.environment.validator';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

/**
 * This function triggers validation of the AWS environment
 * @param config - The environment configuration
 * @returns -
 */
export function validateAwsEnvironment(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(AwsEnvironmentValidator, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
