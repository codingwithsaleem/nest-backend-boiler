import { IsNotEmpty, IsNumber } from 'class-validator';

// This class is used to do validation on the environment, same way as DTOs
export class EnvironmentValidator {
  @IsNumber()
  PORT: number;

  @IsNotEmpty()
  API_NAME: string;

  @IsNotEmpty()
  API_URL: string;

  @IsNotEmpty()
  FRONTEND_URL: string;

  @IsNotEmpty()
  FRONTEND_URL_REDIRECTION_PROFILE: string;
}
