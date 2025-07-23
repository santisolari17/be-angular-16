import { TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from './error-handler.service'; 

describe('ErrorHandlerService', () => {
	let service: ErrorHandlerService;
	
	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ErrorHandlerService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('received', () => {
		it('should handle known error with "N" result (Business error)', () => {
			const error = new Error(
				JSON.stringify({
					error: {
						mensajeNegocio: 'Business error occurred',
						resultado: 'N',
						codigoOperacion: '12345',
					},
				})
			);

			service.received(error);

			expect(service.modalData.mensaje).toBe('Business error occurred');
			expect(service.modalData.codigo).toBe('');
			expect(service.modalErrorNegocio).toBe(true);
			expect(service.modalErrorTecnico).toBe(false);
		});

		it('should handle known error with "T" result (Technical error)', () => {
			const error = new Error(
				JSON.stringify({
					error: {
						mensajeNegocio: 'Technical error occurred',
						resultado: 'T',
						codigoOperacion: '67890',
					},
				})
			);

			service.received(error);

			expect(service.modalData.mensaje).toBe('Technical error occurred');
			expect(service.modalData.codigo).toBe('67890');
			expect(service.modalErrorNegocio).toBe(false);
			expect(service.modalErrorTecnico).toBe(true);
		});

		it('should handle unknown error format gracefully', () => {
		  const error = {
		    message: 'Some error without expected format',
		  };

		  service.received(error);

		  expect(service.modalData.mensaje).toBe(service.mensajeNegocio);
		  expect(service.modalData.codigo).toBe('ERR/A');
		  expect(service.modalErrorNegocio).toBe(false);
		  expect(service.modalErrorTecnico).toBe(true);
		});

		it('should handle unexpected exceptions in error parsing', () => {
		  const invalidError = new Error( 'invalid JSON format');

		  service.received(invalidError);

		  expect(service.modalData.mensaje).toBe(service.mensajeNegocio);
		  expect(service.modalData.codigo).toBe('ERR/B');
		  expect(service.modalErrorTecnico).toBe(true);
		});
	});
});
