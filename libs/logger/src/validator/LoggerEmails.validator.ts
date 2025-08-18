import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isEmail,
} from 'class-validator';

/**
 * Validator class for validating admin emails.
 */
@ValidatorConstraint({ name: 'LoggerEmailsValidator' })
export class LoggerEmailsValidator implements ValidatorConstraintInterface {
  /**
   * Validates the admin emails.
   * @param emails - The emails to be validated.
   * @returns True if all emails are valid, false otherwise.
   */
  validate(emails: string) {
    if (!emails) return true;
    return emails.split(':').every(email => isEmail(email));
  }

  /**
   * Returns the default error message for invalid admin emails.
   * @returns The default error message.
   */
  defaultMessage() {
    return `Invalid emails`;
  }
}
