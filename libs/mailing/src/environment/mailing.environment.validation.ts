import { MailingEnvironmentValidator } from '@app/mailing/environment/mailing.environment.validator';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

/**
 * This function triggers validation of the environment
 * @param config - The environment configuration
 * @returns -
 */
export function validateMailingEnvironment(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(MailingEnvironmentValidator, config, {
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
