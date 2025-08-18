import { IsNotEmpty } from 'class-validator';

// This class is used to do validation on the mailing environment, same way as DTOs
export class MailingEnvironmentValidator {
  @IsNotEmpty()
  POSTMARK_SERVER_API_KEY: string;

  @IsNotEmpty()
  POSTMARK_ACCOUNT_API_KEY: string;
}
