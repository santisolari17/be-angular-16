import { Injectable } from '@angular/core';
import { validate, ValidationError as ClassValidatorError } from 'class-validator';
import { forIn } from 'lodash';
import { TValidationErrorDefinition } from '../errors/entity-validation-error';
import { IClassEntityValidator } from '../../../interfaces/class-entity-validator.interface';

@Injectable({ providedIn: 'root' })
export class ClassEntityValidatorService implements IClassEntityValidator {
	public async validate(classValidatorEntity: object): Promise<void> {
		const validationResults = await validate(classValidatorEntity);

		if (validationResults.length > 0) {
			const entityType = classValidatorEntity.constructor.name;
			const errors = this._extractErrors(validationResults, entityType);

			const errorLogs = [];
			for (const err of errors) {
				errorLogs.push(this._makeErrorString(err));
			}
			console.warn(`[BACKEND_PROPERTY_VALUE_MISMATCH] Entity of type "${entityType}" is not a valid entity of that type.`);
			for (const warning of errorLogs) {
				console.warn(warning);
			}
		}
	}

	private _makeErrorString(errors: TValidationErrorDefinition): string {
		return `resource: [${errors.resource}] - code: [${errors.code}] message: [${errors.message}]`;
	}

	private _extractErrors(validationErrors: ClassValidatorError[], resource: string, parentPropertyName?: string): TValidationErrorDefinition[] {
		const propertyErrors: TValidationErrorDefinition[] = [];

		for (const vr of validationErrors) {
			if (vr.constraints) {
				forIn(vr.constraints, (message: string, type: string) => {
					const code = parentPropertyName ? `${parentPropertyName}_${vr.property}_${type}` : `${vr.property}_${type}`;
					message += `] [provided value: ${vr.value}]`;
					propertyErrors.push({ resource, code, message });
				});
			}

			if (vr.children && vr.children.length > 0) {
				const errorCode = parentPropertyName ? `${parentPropertyName}_${vr.property}` : `${vr.property}`;
				const childrenErrors = this._extractErrors(vr.children, resource, errorCode);
				if (childrenErrors.length > 0) {
					propertyErrors.push(...childrenErrors);
				}
			}
		}

		return propertyErrors;
	}
}
