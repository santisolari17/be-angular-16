import { InjectionToken, Provider } from '@angular/core';
import { IAppAlertModalService } from '../../interfaces/app-alert-modal-service.interface';
import { AppAlertModalService } from './implementations/app-alert-modal.service';

export const APP_ALERT_MODAL_SERVICE_TOKEN = new InjectionToken<IAppAlertModalService>('AppAlertModalService');

export const APP_ALERT_MODAL_SERVICE_PROVIDER: Provider = {
	provide: APP_ALERT_MODAL_SERVICE_TOKEN,
	useExisting: AppAlertModalService,
};
