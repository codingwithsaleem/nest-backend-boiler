import { RegionGroupRepository } from '@app/database';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'RegionGroupIdValidator', async: true })
@Injectable()
export class RegionGroupIdValidator implements ValidatorConstraintInterface {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(private readonly repository: RegionGroupRepository) {}

  /**
   * Validates the given region group ID.
   * @param id - The region group ID to validate.
   * @returns a boolean indicating whether the region group ID exists in the repository.
   */
  async validate(id: string) {
    return await this.repository.exists(id);
  }

  /**
   * Returns the default error message for invalid region group.
   * @returns The default error message.
   */
  defaultMessage() {
    return `Invalid Region group`;
  }
}
