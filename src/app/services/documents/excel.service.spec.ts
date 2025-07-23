import { TestBed } from '@angular/core/testing';

import { ParentInteractorService } from 'beche-utils-lib';
import { ExcelService } from './excel.service';
import { SignalsService } from '@services/signals.service';

export class ParentInteractorServiceMock {
	getLoginData() {
		return {
			extra: {
				razonSocial: 'Movistar',
				nombreUsuario: 'Maria Perez',
				oficina: 'Oficina Central',
				nombreEjecutivo: 'Carlos Diaz',
				nombreDeFantasia: '',
				emailEjecutivo: 'el@test.cl',
				codOficina: '929292',
			},
			personaEmpresa: {
				rut: '59292929',
				digito: 'k',
			},
			personaNatural: {
				rut: '12928292',
				digito: '2',
			},
		};
	}
}

jest.mock('beche-utils-lib', () => ({
	ExcelDocument: jest.fn().mockImplementation(() => ({
		addHojaFormato1Multi: jest.fn(),
		addHojaData: jest.fn(),
		download: jest.fn(),
		addHojaFormato1: jest.fn(),
	})),
	ParentInteractorService: jest.fn().mockImplementation(() => ({
		getLoginData: jest.fn(),
	})),
}));

describe('ExcelService', () => {
	let service: ExcelService;
	let signalsService: SignalsService;
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			providers: [
				{ provide: ParentInteractorService, useClass: ParentInteractorServiceMock },
			],
		}).compileComponents();
		service = TestBed.inject(ExcelService);
		signalsService = TestBed.inject(SignalsService);
	});

	it('should create', () => {
		expect(service).toBeTruthy();
	});

	it('should create document excell correctly', () => {
		expect(service.createExcel()).toBeTruthy();
	});
});
