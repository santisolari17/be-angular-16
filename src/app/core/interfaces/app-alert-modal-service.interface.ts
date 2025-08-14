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

export interface IAppAlertModalService {
	showAppAlert(alertConfig: TAppAlertModalParams): void;
}
