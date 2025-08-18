import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isObject,
} from 'class-validator';

/**
 * Custom validator for objects that are not empty.
 * This validator is similar to IsNotEmptyObject of class-validator but considers null as a not empty value.
 */
@ValidatorConstraint({ name: 'isNotEmptyObjectCustom', async: false })
export class IsNotEmptyObjectCustom implements ValidatorConstraintInterface {
  /**
   *
   * @param value
   */
  validate(value: any) {
    if (!isObject(value)) {
      return false;
    } else if (Object.keys(value).length === 0) {
      return false;
    }
    const ret = !Object.values(value).every(propertyValue => propertyValue === undefined);
    return ret;
  }

  /**
   *
   * @param args
   */
  defaultMessage(args: ValidationArguments) {
    return `${args.property} should not be an empty object`;
  }
}
