import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { RegionStateRepository } from '../repositories/RegionState.repository';

@ValidatorConstraint({ name: 'RegionStateIdValidator', async: true })
@Injectable()
export class RegionStateIdValidator implements ValidatorConstraintInterface {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(private readonly repository: RegionStateRepository) {}

  /**
   * Validates the given region state ID.
   * @param id - The region state ID to validate.
   * @returns a boolean indicating whether the region state ID exists in the repository.
   */
  async validate(id: string) {
    console.log('RegionStateIdValidator.validate', id);
    return await this.repository.exists(id);
  }

  /**
   * Returns the default error message for invalid region state.
   * @returns The default error message.
   */
  defaultMessage(): string {
    return 'Invalid Region State id';
  }
}
