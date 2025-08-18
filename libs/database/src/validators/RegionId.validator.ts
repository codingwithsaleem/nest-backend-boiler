import { RegionRepository } from '@app/database';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'RegionIdValidator', async: true })
@Injectable()
export class RegionIdValidator implements ValidatorConstraintInterface {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(private readonly repository: RegionRepository) {}

  /**
   * Validates the given region ID.
   * @param id - The region ID to validate.
   * @returns a boolean indicating whether the region ID exists in the repository.
   */
  async validate(id: string) {
    return await this.repository.exists(id);
  }

  /**
   * Returns the default error message for invalid region.
   * @returns The default error message.
   */
  defaultMessage(): string {
    return 'Invalid Region id';
  }
}
