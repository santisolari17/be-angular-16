import { Injectable } from '@angular/core';
import { patchInitialFiltersReducerAction } from './reducers/patch-initial-filters.reducer';
import { TAppState } from './TAppState';
import { addAccountReducerAction } from './reducers/add-account.reducer';
import { deleteAccountReducerAction } from './reducers/delete-account.reducer';
import { ApplicationStateSlice } from 'src/app/services/application-state/application-state';

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
