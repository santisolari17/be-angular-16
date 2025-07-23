import { TestBed } from '@angular/core/testing';

import { SignalsService } from './signals.service';

describe('SignalsService', () => {
	let service: SignalsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(SignalsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('showExportBtn', () => {
		it('should set pdfSignal to true', () => {
			service.showExportBtn(true);
			expect(service.exportBtn()).toBe(true);
		});

		it('should set pdfSignal to false', () => {
			service.showExportBtn(false);
			expect(service.exportBtn()).toBe(false);
		});
	});
});
