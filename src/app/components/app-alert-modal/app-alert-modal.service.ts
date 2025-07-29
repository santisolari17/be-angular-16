import { computed, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { TAppAlertModalParams } from './types/TAppModalParams';
import { EAppAlertModalType } from './enums/EAppModalType';

@Injectable({ providedIn: 'root' })
export class AppAlertModalService {
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
