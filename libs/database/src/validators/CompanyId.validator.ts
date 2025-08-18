import { CompanyRepository } from '@app/database/repositories/Company.repository';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'CompanyIdValidator', async: true })
@Injectable()
export class CompanyIdValidator implements ValidatorConstraintInterface {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(private readonly repository: CompanyRepository) {}

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
    return `Invalid Company Id`;
  }
}
