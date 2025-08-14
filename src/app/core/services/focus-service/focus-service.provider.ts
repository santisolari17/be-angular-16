import { InjectionToken, Provider } from '@angular/core';
import { IFocusService } from '../../interfaces/focus-service.interface';
import { FocusService } from './implementations/focus.service';

export const FOCUS_SERVICE_TOKEN = new InjectionToken<IFocusService>('FocusService');

export const FOCUS_SERVICE_PROVIDER: Provider = {
	provide: FOCUS_SERVICE_TOKEN,
	useExisting: FocusService,
};
