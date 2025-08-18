import { SanitizeEmail } from '@app/shared';
import { IsEmail } from 'class-validator';

export class EmailDto {
  @IsEmail()
  @SanitizeEmail()
  email: string;
}
