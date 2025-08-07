import { Injectable } from '@angular/core';
import { addAccountReducerAction } from './reducers/add-account/add-account.reducer';
import { deleteAccountReducerAction } from './reducers/delete-account/delete-account.reducer';
import { patchInitialFiltersReducerAction } from './reducers/patch-initial-filters/patchInitialFilters.reducer';
import { TAppState } from './TAppState';
import { ApplicationStateSlice } from '../application-state-slice';

const INITIAL_STATE: TAppState = {
	initialFiltersResponse: null,
	selectedAccounts: [],
};

@Injectable({ providedIn: 'root' })
export class AppState extends ApplicationStateSlice<TAppState> {
	constructor() {
		super(INITIAL_STATE, [patchInitialFiltersReducerAction, deleteAccountReducerAction, addAccountReducerAction]);
	}
}
