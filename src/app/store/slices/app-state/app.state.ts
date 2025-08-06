import { Injectable } from '@angular/core';
import { patchInitialFiltersReducerAction } from './reducers/patch-initial-filters.reducer';
import { addAccountReducerAction } from './reducers/add-account.reducer';
import { deleteAccountReducerAction } from './reducers/delete-account.reducer';
import { InitialFiltersResponse } from '@backend/models/InitialFiltersResponse';
import { Account } from '@backend/models/Account';
import { ApplicationStateSlice } from '../../model/application-state-slice';

export enum EAppStateAction {
	PatchInitialFilters = 'APP_STATE_PATCH_INITIAL_FILTERS',
	AddAccount = 'APP_STATE_ADD_ACCOUNT',
	DeleteAccount = 'APP_STATE_DELETE_ACCOUNT',
}

export type TAppState = {
	initialFiltersResponse: InitialFiltersResponse;
	selectedAccounts: Account[];
};

const INITIAL_STATE: TAppState = {
	initialFiltersResponse: null,
	selectedAccounts: [],
};

@Injectable({ providedIn: 'root' })
export class AppState extends ApplicationStateSlice<TAppState> {
	constructor() {
		super(INITIAL_STATE, [patchInitialFiltersReducerAction, addAccountReducerAction, deleteAccountReducerAction]);
	}
}
