import { Injectable, WritableSignal, Signal, signal, computed } from '@angular/core';
import { EAppAlertModalType, IAppAlertModalService, TAppAlertModalParams } from '../../../interfaces/app-alert-modal-service.interface';

@Injectable({ providedIn: 'root' })
export class AppAlertModalService implements IAppAlertModalService {
	private _alertSignal: WritableSignal<TAppAlertModalParams>;
	readonly alertConfig: Signal<TAppAlertModalParams>;

	constructor() {
		this._alertSignal = signal({ messages: [], title: '', modalType: EAppAlertModalType.Info });
		this.alertConfig = computed(() => this._alertSignal());
	}

	showAppAlert(alertConfig: TAppAlertModalParams): void {
		this._alertSignal.set(alertConfig);
	}
}
