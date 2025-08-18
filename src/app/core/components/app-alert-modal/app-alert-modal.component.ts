import { Component, computed, effect, EventEmitter, inject, Output, Signal } from '@angular/core';
import { APP_ALERT_MODAL_SERVICE_TOKEN } from '../../services/app-alert-modal/app-alert-modal.provider';
import {
	IAppAlertModalService,
	TAppAlertModalMesage,
	TAppAlertModalParams,
	TModalCloseEvent,
} from '../../interfaces/app-alert-modal-service.interface';

@Component({
	selector: 'be-alert-modal',
	templateUrl: './app-alert-modal.component.html',
	styleUrls: ['./app-alert-modal.component.scss'],
})
export class AppAlertModalComponent {
	public alertConfig: Signal<TAppAlertModalParams>;
	public messages: Signal<TAppAlertModalMesage[]>;
	public showModal: boolean = false;

	private _initialRun: boolean = true;

	@Output() public modalClosed: EventEmitter<TModalCloseEvent> = new EventEmitter<TModalCloseEvent>();

	public appAlertModalService = inject<IAppAlertModalService>(APP_ALERT_MODAL_SERVICE_TOKEN);

	constructor() {
		this.alertConfig = computed(() => this.appAlertModalService.alertConfig());
		this.messages = computed(() => this.alertConfig().messages);

		effect(() => {
			this.alertConfig();
			this._mainEffectAction();
		});
	}

	public closeModalHanlder(): void {
		this.modalClosed.emit({ closed: true });
	}

	private _mainEffectAction(): void {
		if (!this._initialRun) {
			this.showModal = true;
		}

		this._initialRun = false;
	}
}
