import { InjectionToken, Provider } from '@angular/core';
import { ClassEntityValidatorService } from './implementations/class-entity-validator.service';
import { IClassEntityValidator } from '../../interfaces/class-entity-validator.interface';

export const CLASS_ENTITY_VALIDATOR_TOKEN = new InjectionToken<IClassEntityValidator>('ClassEntityValidator');

export const CLASS_ENTITY_VALIDATOR_PROVIDER: Provider = {
	provide: CLASS_ENTITY_VALIDATOR_TOKEN,
	useExisting: ClassEntityValidatorService,
};
