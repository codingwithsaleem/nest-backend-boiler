import { IndustryRepository } from '@app/database';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'IndustryIdValidator', async: true })
@Injectable()
export class IndustryIdValidator implements ValidatorConstraintInterface {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(private readonly repository: IndustryRepository) {}

  /**
   * Validates the given industry ID.
   * @param id - The industry ID to validate.
   * @returns A boolean indicating whether the industry ID exists.
   */
  async validate(id: string) {
    return await this.repository.exists(id);
  }

  /**
   * Returns the default error message for an invalid industry id.
   * @returns The default error message.
   */
  defaultMessage() {
    return `Invalid industry Id`;
  }
}
