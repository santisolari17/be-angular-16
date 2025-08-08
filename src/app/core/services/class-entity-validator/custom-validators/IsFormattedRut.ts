import { ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';

/**
 * Validates if given string is a valid formatted RUT
 * @param {ValidationOptions} validationOptions Default class validation options
 */
export function IsFormattedRUT(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {
  const defaultValidationMessage = 'Formatted RUT value must be a string in the format X.XXX.XXX-X';
  const newValidationOptions: ValidationOptions = validationOptions || { message: defaultValidationMessage };
  newValidationOptions.message = newValidationOptions.message || defaultValidationMessage;

  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsFormattedRUT',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: newValidationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const regex = /^\d{1,2}\.\d{3}\.\d{3}-[0-9K]$/;
          return regex.test(value);
        },
      },
    });
  };
}
