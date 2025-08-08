import { ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';

/**
 * Validates if given string is a valid formatted currency value
 * @param {ValidationOptions} validationOptions Default class validation options
 */
export function IsFormattedCurrencyString(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isFormattedNumber',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					// Regular expression to match the number format 'X.XXX,XX'
					const regex = /^\d{1,3}(?:\.\d{3})*(?:,\d+)?$/;
					return typeof value === 'string' && regex.test(value);
				},
				defaultMessage(args: ValidationArguments) {
					return 'The value must be a valid number string with format X.XXX,XX';
				},
			},
		});
	};
}
