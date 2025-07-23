import { TestBed } from '@angular/core/testing';
import { PdfService } from './pdf.service';
import { ParentInteractorService } from 'beche-utils-lib';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
	PdfDocumentMovimientos: jest.fn().mockImplementation(() => ({
		configureHeader: jest.fn(),
		addTitle: jest.fn(),
		addHtmlElement: jest.fn(),
		addTable: jest.fn(),
		createFooter: jest.fn(),
		open: jest.fn(),
	})),
	ParentInteractorService: jest.fn().mockImplementation(() => ({
		getLoginData: jest.fn(),
	})),
}));

describe('PdfService', () => {
	let service: PdfService;
	let docMock: { addHtmlElement: jest.Mock; open: jest.Mock };
	beforeEach(() => {
		docMock = {
			addHtmlElement: jest.fn(),
			open: jest.fn(),
		};
		TestBed.configureTestingModule({
			providers: [
				PdfService,
				{ provide: ParentInteractorService, useClass: ParentInteractorServiceMock },
			],
			imports: [HttpClientTestingModule],
		});

		const saldoContentElement = document.createElement('div');
		saldoContentElement.id = 'card';
		document.body.appendChild(saldoContentElement);

		service = TestBed.inject(PdfService);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should create', () => {
		expect(service).toBeTruthy();
	});

	it('should create document pdf correctly', async () => {
		const resp = await service.createPdf();
		expect(resp).toBeTruthy();
	});

	it('should return false if an error occurs during PDF creation', async () => {
		jest.spyOn(document, 'getElementById').mockImplementation(() => {
			throw new Error('Element not found');
		});

		const result = await service.createPdf();
		expect(result).toBeFalsy();
	});

});
