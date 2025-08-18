import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HTTP_SERVICE_PROVIDER, HTTP_SERVICE_TOKEN } from './http-service.provider';
import { IHttpService } from '../../interfaces/http-service.interface';
import { APP_ALERT_MODAL_SERVICE_TOKEN } from '../app-alert-modal/app-alert-modal.provider';
import { HTTP_ERROR_HANDLER_TOKEN } from '../http-error-handler/http-error-handler.provider';

describe('HttpService', () => {
	let service: IHttpService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				HTTP_SERVICE_PROVIDER,
				{
					provide: APP_ALERT_MODAL_SERVICE_TOKEN,
					useValue: { alertConfig$: of({ messages: [], title: '', status: 'warning' }), showAppAlert: jest.fn() },
				},
				{
					provide: HTTP_ERROR_HANDLER_TOKEN,
					useValue: {
						catch200CodeResponseError: jest.fn(),
						handleHttpError: jest.fn(),
					},
				},
			],
		});

		service = TestBed.inject(HTTP_SERVICE_TOKEN);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
