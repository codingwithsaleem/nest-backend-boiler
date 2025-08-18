import { RegionRepository } from '@app/database';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'LocationIdValidator', async: true })
@Injectable()
export class LocationIdValidator implements ValidatorConstraintInterface {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(private readonly repository: RegionRepository) {}

  /**
   * Validates the given location ID.
   * @param id - The location ID to validate.
   * @returns A boolean indicating whether the location ID is valid.
   */
  async validate(id: string): Promise<boolean> {
    return await this.repository.exists(id);
  }

  /**
   * Returns the default error message for an invalid region id.
   * @returns The default error message.
   */
  defaultMessage(): string {
    return 'Invalid region id';
  }
}
