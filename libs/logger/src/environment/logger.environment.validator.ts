import { LoggerEmailsValidator } from '@app/logger/validator/LoggerEmails.validator';
import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';

export class LoggerEnvironmentValidator {
  @IsOptional()
  @Validate(LoggerEmailsValidator)
  @IsString()
  LOGGER_ERROR_EMAILS?: string;

  @IsOptional()
  @Validate(LoggerEmailsValidator)
  @IsString()
  LOGGER_WARN_EMAILS?: string;

  @IsNotEmpty()
  POSTMARK_SERVER_API_KEY: string;
}
