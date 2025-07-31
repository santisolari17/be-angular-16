import { Injectable } from '@angular/core';
import { ApplicationStateSlice } from '@services/application-state/application-state';
import { patchInitialFiltersReducerAction } from './reducers/patch-initial-filters.reducer';
import { TAppState } from './TAppState';

const INITIAL_STATE: TAppState = {
	initialFiltersResponse: null,
};

@Injectable({ providedIn: 'root' })
export class AppState extends ApplicationStateSlice<TAppState> {
	constructor() {
		super(INITIAL_STATE, [patchInitialFiltersReducerAction]);
	}
}
