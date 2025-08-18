import { JobPostRepository } from '@app/database';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'JobPostIdValidator', async: true })
@Injectable()
export class JobPostIdValidator implements ValidatorConstraintInterface {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(private readonly repository: JobPostRepository) {}

  /**
   * Validates the given job post ID.
   * @param id - The job post ID to validate.
   * @returns a boolean indicating whether the job post ID exists in the repository.
   */
  async validate(id: string) {
    return await this.repository.exists(id);
  }

  /**
   * Returns the default error message for invalid job post.
   * @returns The default error message.
   */
  defaultMessage(): string {
    return 'Invalid Job Post id';
  }
}
