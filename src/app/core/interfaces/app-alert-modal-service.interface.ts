import { Signal } from '@angular/core';

export enum EAppAlertModalType {
	Info = 'info',
	Error = 'error',
	Success = 'success',
	Warning = 'warning',
}

export type TAppAlertModalParams = {
	modalType: EAppAlertModalType;
	title: string;
	messages: TAppAlertModalMesage[];
	okButtonCaption?: string;
};

export type TAppAlertModalMesage = {
	text: string;
	topMarginLevel: 0 | 1 | 2 | 3 | 4;
};

export type TModalCloseEvent = {
	closed: boolean;
};

export interface IAppAlertModalService {
	readonly alertConfig: Signal<TAppAlertModalParams>;
	showAppAlert(alertConfig: TAppAlertModalParams): void;
}
