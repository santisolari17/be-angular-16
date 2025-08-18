import { TestBed } from '@angular/core/testing';
import { IBackendResponseOperators } from '@core/interfaces';
import { BACKEND_RESPONSE_OPERATORS_SERVICE_PROVIDER, BACKEND_RESPONSE_OPERATORS_SERVICE_TOKEN } from './backend-response-operators.provider';
import { HTTP_SERVICE_TOKEN } from '../http/http-service.provider';
import { CLASS_ENTITY_VALIDATOR_TOKEN } from '../class-entity-validator/class-entity-validator.provider';

describe('[Core service] backend-response-operators', () => {
	let service: IBackendResponseOperators;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				BACKEND_RESPONSE_OPERATORS_SERVICE_PROVIDER,
				{ provide: HTTP_SERVICE_TOKEN, useValue: {} },
				{ provide: CLASS_ENTITY_VALIDATOR_TOKEN, useValue: {} },
			],
		});

		service = TestBed.inject(BACKEND_RESPONSE_OPERATORS_SERVICE_TOKEN);

		jest.resetAllMocks();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
