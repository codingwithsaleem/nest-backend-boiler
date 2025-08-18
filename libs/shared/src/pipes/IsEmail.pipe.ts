import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isEmail } from 'class-validator';

@Injectable()
export class IsEmailPipe implements PipeTransform<string> {
  /**
   * Validates that the value is an email address.
   * @param value - The value to validate.
   * @returns The value if it is an email address.
   */
  transform(value: string): string {
    if (!isEmail(value)) {
      throw new BadRequestException('Invalid email address');
    }
    return value;
  }
}
