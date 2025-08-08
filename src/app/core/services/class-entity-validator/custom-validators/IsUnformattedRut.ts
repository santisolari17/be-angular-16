import { ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';

/**
 * Validates if given string is a valid unformatted RUT
 * @param {ValidationOptions} validationOptions Default class validation options
 */
export function IsUnformattedRUT(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {
  const defaultValidationMessage =
    'Unformatted RUT value must be a string that has 7-8 digits plus a verification character being any number or the letter K (uppercase)';
  const newValidationOptions: ValidationOptions = validationOptions || { message: defaultValidationMessage };
  newValidationOptions.message = newValidationOptions.message || defaultValidationMessage;

  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsUnformattedRUT',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: newValidationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const regex = /^\d{7,8}[0-9K]$/;
          return regex.test(value);
        },
      },
    });
  };
}
