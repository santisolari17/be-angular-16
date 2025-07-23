import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHandlerService } from './http-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HeadersService } from './headers.service';

describe('HttpHandlerService', () => {
	let service: HttpHandlerService;
	let httpMock: HttpTestingController;
	let headersServiceMock: { getDefaultHeaders: jest.Mock };
	let errorHandlerServiceMock: { received: jest.Mock };
	const mockResponse = {
		codigo: 200,
		mensaje: 'Obtiene configuracion Portales Embebidos OK',
		payload: {
			param1: "test",
			param2: "test",
			URL: "https://test",
			TimeTokenPriv: '100'
		},
		mensajeNegocio: "",
		codigoOperacion: 'BFF.EMB.0000'
	}

	beforeEach(() => {
		headersServiceMock = {
			getDefaultHeaders: jest.fn().mockReturnValue({
				'Content-Type': 'application/json'
			})
		};

		errorHandlerServiceMock = {
			received: jest.fn()
		};

		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				HttpHandlerService,
				{ provide: HeadersService, useValue: headersServiceMock },
			]
		});

		service = TestBed.inject(HttpHandlerService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	describe('post', () => {
		it('should make a POST request and return response data', (done) => {
			const url = 'http://example.com/api';
			const body = { field: 'value' };
			service.post('testStage', url, body).subscribe((response) => {
				expect(response).toEqual(mockResponse);
				done();
			});

			const req = httpMock.expectOne(url);
			expect(req.request.method).toBe('POST');
			expect(req.request.headers.get('Content-Type')).toBe('application/json');
			req.flush(mockResponse);
		});

		it('should handle HTTP error response', (done) => {
			const url = 'http://example.com/api';
			const body = { field: 'value' };

			service.post('testStage', url, body).subscribe({
				next: () => { },
				error: (error) => {
					expect(error.status).toBe(500);
					done();
				}
			});

			const req = httpMock.expectOne(url);
			req.flush('Test error', { status: 500, statusText: 'Server Error' });
		});
	});

	describe('get', () => {
		it('should make a GET request and return response data', (done) => {
			const url = 'http://example.com/api';

			service.get('testStage', url).subscribe((response) => {
				expect(response).toEqual(mockResponse);
				done();
			});

			const req = httpMock.expectOne(url);
			expect(req.request.method).toBe('GET');
			expect(req.request.headers.get('Content-Type')).toBe('application/json');
			req.flush(mockResponse);
		});

		    it('should handle HTTP error response', (done) => {
		      const errorResponse = new HttpErrorResponse({
		        error: 'Test error',
		        status: 404,
		        statusText: 'Not Found'
		      });
		      const url = 'http://example.com/api';

		      service.get('testStage', url).subscribe({
		        next: () => {},
		        error: (error) => {
		          expect(error.status).toBe(404);
		          done();
		        }
		      });

		      const req = httpMock.expectOne(url);
		      req.flush('Test error', { status: 404, statusText: 'Not Found' });
		    });
	});
});