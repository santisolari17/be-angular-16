import { Injectable } from '@angular/core';
import { TAppState } from './model/TAppState';
import { patchInitialFiltersReducerAction } from './reducers/patchInitialFilters/patchInitialFilters.reducer';
import { deleteAccountReducerAction } from './reducers/clearResumenSearch/delete-account.reducer';
import { ApplicationStateSlice } from '@store/model/application-state-slice';

const INITIAL_STATE: TAppState = {
	initialFiltersResponse: null,
	selectedAccounts: [],
};

@Injectable({ providedIn: 'root' })
export class AppState extends ApplicationStateSlice<TAppState> {
	constructor() {
		super(INITIAL_STATE, [patchInitialFiltersReducerAction, deleteAccountReducerAction]);
	}
}
