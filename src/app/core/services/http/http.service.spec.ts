import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HTTP_SERVICE_PROVIDER, HTTP_SERVICE_TOKEN } from './http-service.provider';
import { IHttpService } from '../../interfaces/http-service.interface';
import { AppAlertModalService } from '../../components/app-alert-modal/app-alert-modal.service';

describe('HttpService', () => {
	let service: IHttpService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				HTTP_SERVICE_PROVIDER,
				{
					provide: AppAlertModalService,
					useValue: { alertConfig$: of({ messages: [], title: '', status: 'warning' }), showAppAlert: jest.fn() },
				},
			],
		});

		service = TestBed.inject(HTTP_SERVICE_TOKEN);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
