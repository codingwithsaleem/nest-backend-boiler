import { IsNotEmpty } from 'class-validator';

export class TokenDto {
  /**
   * Token
   */
  @IsNotEmpty()
  token: string;
}
