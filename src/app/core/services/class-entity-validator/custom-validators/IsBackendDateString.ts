import { ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';

/**
 * Validates if given string is a valid formatted RUT
 * @param {ValidationOptions} validationOptions Default class validation options
 */
export function IsBackendDateString(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {
  const defaultValidationMessage = 'DateString value must be a string in the format YYYY-MM-DD-hh.mm.ss.SSSSSS';
  const newValidationOptions: ValidationOptions = validationOptions || { message: defaultValidationMessage };
  newValidationOptions.message = newValidationOptions.message || defaultValidationMessage;

  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsBackendDateString',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: newValidationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const numPad = (n: number) => {
            return n < 10 ? `0${n}` : n;
          };
          const regex = /^\d{4}-\d{2}-\d{2}-\d{2}\.\d{2}\.\d{2}\.\d{6}$/;

          if (!regex.test(value)) {
            return false;
          }

          const [year, month, day, hour, minute, second, microseconds] = value.split(/[-.]/).map(Number);

          const isoDateString = `${year}-${numPad(month)}-${numPad(day)}T${numPad(hour)}:${numPad(minute)}:${numPad(
            second
          )}.${microseconds}`;
          const validateDate = new Date(isoDateString);

          if (isNaN(validateDate.getTime())) {
            return false;
          }

          return validateDate.getFullYear() === year && validateDate.getMonth() === month - 1 && validateDate.getDate() === day;
        },
      },
    });
  };
}
