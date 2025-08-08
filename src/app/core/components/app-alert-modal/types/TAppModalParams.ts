import { EAppAlertModalType } from '../enums/EAppModalType';

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
