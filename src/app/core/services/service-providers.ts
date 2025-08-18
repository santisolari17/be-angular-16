import { Provider } from '@angular/core';
import { HTTP_SERVICE_PROVIDER } from './http/http-service.provider';
import { CLASS_ENTITY_VALIDATOR_PROVIDER } from './class-entity-validator/class-entity-validator.provider';
import { BACKEND_RESPONSE_OPERATORS_SERVICE_PROVIDER } from './backend-response-operators/backend-response-operators.provider';
import { EXCEL_GENERATOR_SERVICE_PROVIDER } from './excel-generator/excel-generator.provider';
import { HTTP_ERROR_HANDLER_PROVIDER } from './http-error-handler/http-error-handler.provider';
import { FOCUS_SERVICE_PROVIDER } from './focus-service/focus-service.provider';
import { APP_ALERT_MODAL_SERVICE_PROVIDER } from './app-alert-modal/app-alert-modal.provider';

export const APP_SERVICE_PROVIDERS: Provider[] = [
	HTTP_SERVICE_PROVIDER,
	BACKEND_RESPONSE_OPERATORS_SERVICE_PROVIDER,
	CLASS_ENTITY_VALIDATOR_PROVIDER,
	EXCEL_GENERATOR_SERVICE_PROVIDER,
	HTTP_ERROR_HANDLER_PROVIDER,
	FOCUS_SERVICE_PROVIDER,
	APP_ALERT_MODAL_SERVICE_PROVIDER,
];
