import { StorageEnvironmentValidator } from '@app/storage/environment/storage.environment.validator';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

/**
 * This function triggers validation of the environment
 * @param config - The environment configuration
 * @returns -
 */
export function validateStorageEnvironment(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(StorageEnvironmentValidator, config, {
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
