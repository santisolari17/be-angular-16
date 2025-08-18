import { TestBed } from '@angular/core/testing';
import { IExcelGenerator } from '@core/interfaces';
import { EXCEL_GENERATOR_SERVICE_PROVIDER, EXCEL_GENERATOR_SERVICE_TOKEN } from './excel-generator.provider';
import { ParentInteractorService } from 'beche-utils-lib';

describe('[Core service] excel-generator', () => {
	let service: IExcelGenerator;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [EXCEL_GENERATOR_SERVICE_PROVIDER, { provide: ParentInteractorService, useValue: { getLoginData: jest.fn() } }],
		});

		service = TestBed.inject(EXCEL_GENERATOR_SERVICE_TOKEN);

		jest.resetAllMocks();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
