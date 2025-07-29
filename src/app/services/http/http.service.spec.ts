import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { PdfDocumentMovimientos } from 'beche-utils-lib';
import { of } from 'rxjs';
import { MonedaPipe } from 'asd';
import { HttpService } from './http.service';
import { AppAlertModalService } from '@components/app-alert-modal/app-alert-modal.service';

describe('HttpService', () => {
	let service: HttpService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule],
			providers: [
				DatePipe,
				MonedaPipe,
				PdfDocumentMovimientos,
				{
					provide: AppAlertModalService,
					useValue: { alertConfig$: of({ messages: [], title: '', status: 'warning' }), showAppAlert: jest.fn() },
				},
			],
		});
		service = TestBed.inject(HttpService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
