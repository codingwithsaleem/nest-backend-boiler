import { IsNotEmpty, IsNumber } from 'class-validator';

// This class is used to do validation on the authentication environment, same way as DTOs
export class AuthenticationEnvironmentValidator {
  @IsNumber()
  PORT: number;

  @IsNotEmpty()
  API_NAME: string;

  @IsNotEmpty()
  API_URL: string;

  @IsNotEmpty()
  FRONTEND_URL: string;

  @IsNotEmpty()
  FRONTEND_RECOVER_URL: string;

  @IsNotEmpty()
  AUTH_JWT_SECRET: string;

  @IsNotEmpty()
  REDIS_HOST: string;

  @IsNumber()
  REDIS_PORT: number;

  @IsNotEmpty()
  SESSION_SECRET: string;

  @IsNotEmpty()
  LINKEDIN_CLIENT_ID: string;

  @IsNotEmpty()
  LINKEDIN_PRIMARY_CLIENT_SECRET: string;

  @IsNotEmpty()
  GOOGLE_CLIENT_ID: string;

  @IsNotEmpty()
  GOOGLE_PRIMARY_CLIENT_SECRET: string;
}
