import { UserRepository } from '@app/database';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'UserIdValidator', async: true })
@Injectable()
export class UserIdValidator implements ValidatorConstraintInterface {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(private readonly repository: UserRepository) {}

  /**
   * Validates the given user ID.
   * @param id - The user ID to validate.
   * @returns A boolean indicating whether the user ID exists in the repository.
   */
  async validate(id: string): Promise<boolean> {
    return await this.repository.exists(id);
  }

  /**
   * Returns the default error message for invalid user.
   * @returns The default error message.
   */
  defaultMessage(): string {
    return 'Invalid User id';
  }
}
