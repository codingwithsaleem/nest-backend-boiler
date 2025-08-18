import { IsBooleanString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

// This class is used to do validation on the database environment, same way as DTOs
export class DatabaseEnvironmentValidator {
  @IsNumber()
  DB_PORT: number;

  @IsNotEmpty()
  DB_HOST: string;

  @IsNotEmpty()
  DB_NAME: string;

  @IsNotEmpty()
  DB_USER: string;

  @IsNotEmpty()
  DB_PASSWORD: string;

  @IsOptional()
  @IsBooleanString()
  DB_DEBUG?: 'true' | 'false';

  @IsOptional()
  @IsBooleanString()
  MIKRO_ORM_ALLOW_GLOBAL_CONTEXT?: 'true' | 'false';
}
