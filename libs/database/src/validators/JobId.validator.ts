import { JobRepository } from '@app/database';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'JobIdValidator', async: true })
@Injectable()
export class JobIdValidator implements ValidatorConstraintInterface {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(private readonly repository: JobRepository) {}

  /**
   * Validates the given job ID.
   * @param id - The job ID to validate.
   * @returns a boolean indicating whether the job ID exists in the repository.
   */
  async validate(id: string) {
    return await this.repository.exists(id);
  }

  /**
   * Returns the default error message for invalid job.
   * @returns The default error message.
   */
  defaultMessage(): string {
    return 'Invalid Job id';
  }
}
