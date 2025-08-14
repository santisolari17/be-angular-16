import { TestBed } from '@angular/core/testing';
import { IBackendResponseOperators } from '@core/interfaces';
import { BACKEND_RESPONSE_OPERATORS_SERVICE_PROVIDER, BACKEND_RESPONSE_OPERATORS_SERVICE_TOKEN } from './backend-response-operators.provider';

describe('[Core service] backend-response-operators', () => {
	let service: IBackendResponseOperators;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [BACKEND_RESPONSE_OPERATORS_SERVICE_PROVIDER],
		});

		service = TestBed.inject(BACKEND_RESPONSE_OPERATORS_SERVICE_TOKEN);

		jest.resetAllMocks();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
