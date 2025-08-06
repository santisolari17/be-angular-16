import { InjectionToken, Provider } from '@angular/core';
import { BackendResponseOperatorsService } from './implementations/backend-response-operators.service';
import { IBackendResponseOperators } from '@interfaces';

export const BACKEND_RESPONSE_OPERATORS_SERVICE_TOKEN = new InjectionToken<IBackendResponseOperators>('BackendResponseOperators');

export const BACKEND_RESPONSE_OPERATORS_SERVICE_PROVIDER: Provider = {
	provide: BACKEND_RESPONSE_OPERATORS_SERVICE_TOKEN,
	useExisting: BackendResponseOperatorsService,
};
