/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';
import { EDateValidationFormats } from '../enums/EDateValidationFormats';
import moment from 'moment';

export function IsFormattedDateString(format: EDateValidationFormats, validationOptions?: ValidationOptions) {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'IsFormattedDateString',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				validate: (value: any, args: ValidationArguments) => {
					return moment(value, format, true).isValid();
				},
				defaultMessage: (args: ValidationArguments) => {
					return `${propertyName} must match a [${format}] date string`;
				},
			},
		});
	};
}
