import { registerDecorator, ValidationOptions } from 'class-validator';
import validator from 'validator';

/**
 *
 * @param validationOptions
 */
export function SanitizeEmail(validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'sanitizeEmail',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value === 'string') {
            value = validator.normalizeEmail(value);
          }
          return true;
        },
      },
    });
  };
}
