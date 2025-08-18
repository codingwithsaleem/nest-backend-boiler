import { IndustryGroupRepository } from '@app/database';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'IndustryGroupIdValidator', async: true })
@Injectable()
export class IndustryGroupIdValidator implements ValidatorConstraintInterface {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(private readonly repository: IndustryGroupRepository) {}

  /**
   * Validates the given job group ID.
   * @param id - The job group ID to validate.
   * @returns a boolean indicating whether the job group ID exists in the repository.
   */
  async validate(id: string) {
    return await this.repository.exists(id);
  }

  /**
   * Returns the default error message for invalid industry group.
   * @returns The default error message.
   */
  defaultMessage() {
    return `Invalid industry group`;
  }
}
