import { APPLICATION } from '@utils/constants';
import { HeadersService } from './headers.service';

describe('HeadersService', () => {
	let service: HeadersService;

	beforeEach(() => {
		service = new HeadersService();
	});

	it('should create the service', () => {
		expect(service).toBeTruthy();
	});

	it('should return default headers with the specified stage', () => {
		const stage = 'testing';
		const headers = service.getDefaultHeaders(stage);

		expect(headers.get('config-loader')).toBe('true');
		expect(headers.get('nombreAplicacion')).toBe(APPLICATION);
		expect(headers.get('etapa')).toBe(stage);
	});
});
