import { signal } from '@angular/core';
import { EAppAlertModalType } from '../enums/EAppModalType';
import { TAppAlertModalParams } from '../types/TAppModalParams';

export const MOCK_INITIAL_ALERT_CONFIG: TAppAlertModalParams = {
	modalType: EAppAlertModalType.Info,
	title: 'MOCK TITLE',
	messages: [{ text: 'MOCK MESSAGE', topMarginLevel: 1 }],
};

export const appAlertModalServiceMock = {
	alertConfig: signal(MOCK_INITIAL_ALERT_CONFIG),
	showAppAlert: jest.fn(),
};
