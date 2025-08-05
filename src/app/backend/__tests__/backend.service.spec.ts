import { BackendService } from '@backend/backend.service';

describe('BackendService', () => {
	let service: BackendService;

	beforeEach(() => {
		service = new BackendService();
	});

	it('should create', () => {
		expect(service).toBeTruthy();
	});
});
