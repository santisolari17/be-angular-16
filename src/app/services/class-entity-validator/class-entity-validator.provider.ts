import { InjectionToken, Provider } from '@angular/core';
import { IClassEntityValidator } from '@interfaces';
import { ClassEntityValidatorService } from './implementations/class-entity-validator.service';

export const CLASS_ENTITY_VALIDATOR_TOKEN = new InjectionToken<IClassEntityValidator>('ClassEntityValidator');

export const CLASS_ENTITY_VALIDATOR_PROVIDER: Provider = {
	provide: CLASS_ENTITY_VALIDATOR_TOKEN,
	useExisting: ClassEntityValidatorService,
};
