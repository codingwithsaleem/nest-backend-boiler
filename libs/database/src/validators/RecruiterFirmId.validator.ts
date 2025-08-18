import { RecruiterFirmRepository } from '@app/database/repositories/RecruiterFirm.repository';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'RecruiterFirmIdValidator', async: true })
@Injectable()
export class RecruiterFirmIdValidator implements ValidatorConstraintInterface {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(private readonly repository: RecruiterFirmRepository) {}

  /**
   * Validates the given recruiter firm group ID.
   * @param id - The recruiter firm group ID to validate.
   * @returns a boolean indicating whether the recruiter firm group ID exists in the repository.
   */
  async validate(id: string) {
    return await this.repository.exists(id);
  }

  /**
   * Returns the default error message for invalid industry group.
   * @returns The default error message.
   */
  defaultMessage() {
    return `Invalid Recruiter Firm ID`;
  }
}
