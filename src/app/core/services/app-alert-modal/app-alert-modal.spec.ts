import { TestBed } from '@angular/core/testing';
import { EAppAlertModalType, IAppAlertModalService, TAppAlertModalParams } from '../../interfaces/app-alert-modal-service.interface';
import { APP_ALERT_MODAL_SERVICE_PROVIDER, APP_ALERT_MODAL_SERVICE_TOKEN } from './app-alert-modal.provider';

describe('AppAlertModalService', () => {
	let service: IAppAlertModalService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [APP_ALERT_MODAL_SERVICE_PROVIDER],
		});

		service = TestBed.inject(APP_ALERT_MODAL_SERVICE_TOKEN);

		jest.resetAllMocks();
	});

	it('should create', () => {
		expect(service).toBeTruthy();
	});

	it('should set an initial value for the alert modal config', () => {
		const defaultConfig: TAppAlertModalParams = { messages: [], title: '', modalType: EAppAlertModalType.Info };

		expect(service.alertConfig()).toEqual(defaultConfig);
	});

	it('should set the signal property to show an alert', () => {
		const mockModalParams: TAppAlertModalParams = {
			modalType: EAppAlertModalType.Info,
			title: 'Mock Title',
			messages: [{ text: 'Mock Message', topMarginLevel: 1 }],
		};

		service.showAppAlert(mockModalParams);

		expect(service['_alertSignal']()).toEqual(mockModalParams);
	});
});
