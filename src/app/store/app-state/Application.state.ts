import { Injectable } from '@angular/core';
import { addAccountReducerAction } from './reducers/add-account/add-account.reducer';
import { deleteAccountReducerAction } from './reducers/delete-account/delete-account.reducer';
import { TAppState } from './TAppState';
import { ApplicationStateSlice } from '../application-state-slice';
import { createDynamicReducer } from '../simple-reducer-factory';
import { EAppStateAction } from '@store';

const INITIAL_STATE: TAppState = {
	initialFiltersResponse: null,
	selectedAccounts: [],
};

@Injectable({ providedIn: 'root' })
export class AppState extends ApplicationStateSlice<TAppState> {
	constructor() {
		super(INITIAL_STATE, [
			createDynamicReducer({ type: EAppStateAction.PatchInitialFilters, propertyName: 'initialFiltersResponse' }),
			deleteAccountReducerAction,
			addAccountReducerAction,
		]);
	}
}
