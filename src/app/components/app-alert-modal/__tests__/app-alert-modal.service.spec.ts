import { AppAlertModalService } from '../app-alert-modal.service';
import { EAppAlertModalType } from '../enums/EAppModalType';
import { TAppAlertModalParams } from '../types/TAppModalParams';

describe('AppAlertModalService', () => {
	let service: AppAlertModalService;

	beforeEach(() => {
		service = new AppAlertModalService();
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
