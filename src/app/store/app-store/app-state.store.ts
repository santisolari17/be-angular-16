import { Injectable } from '@angular/core';
import { addAccountReducerAction } from './reducers/add-account/add-account.reducer';
import { deleteAccountReducerAction } from './reducers/delete-account/delete-account.reducer';
import { TAppStore } from './TAppStore';
import { ApplicationStateStore } from '@core/abstracts';
import { createDynamicReducer } from '@core/utils';
import { EAppStoreAction } from './EAppStoreAction';

const INITIAL_STATE: TAppStore = {
	initialFiltersResponse: null,
	selectedAccounts: [],
};

@Injectable({ providedIn: 'root' })
export class AppStore extends ApplicationStateStore<TAppStore> {
	constructor() {
		super(INITIAL_STATE, [
			createDynamicReducer({ type: EAppStoreAction.PatchInitialFilters, propertyName: 'initialFiltersResponse' }),
			deleteAccountReducerAction,
			addAccountReducerAction,
		]);
	}
}
