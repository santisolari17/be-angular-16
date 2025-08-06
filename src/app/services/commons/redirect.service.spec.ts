import { TestBed } from '@angular/core/testing';
import { RedirectService } from './redirect.service';
import { ParentInteractorService } from 'beche-utils-lib';

describe('RedirectService', () => {
	let service: RedirectService;
	let parentInteractorServiceMock: jest.Mocked<ParentInteractorService>;

	beforeEach(() => {
		parentInteractorServiceMock = {
			redirectUrlDataEncrypt: jest.fn(),
		} as unknown as jest.Mocked<ParentInteractorService>;
		TestBed.configureTestingModule({
			providers: [{ provide: ParentInteractorService, useValue: parentInteractorServiceMock }],
		});
		service = TestBed.inject(RedirectService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should call redirectUrlDataEncrypt with correct parameters in redirect_CCT_CartolaEnLinea', () => {
		const numeroCuenta = '123456';
		const expectedUrl = `${location.origin}/apps/urlFuncionality`;
		const uidMenu = '64149e6aeaf463cbc742a1de';
		const encryptedParams = {
			etapa: 'EJ0000',
			funcionalidad: 'EJ0000',
		};

		service.redirect_NameFuncionality(numeroCuenta);

		expect(parentInteractorServiceMock.redirectUrlDataEncrypt).toHaveBeenCalledWith(
			uidMenu,
			expectedUrl,
			{ accountNumber: numeroCuenta },
			encryptedParams,
			expect.any(String)
		);
	});
});
