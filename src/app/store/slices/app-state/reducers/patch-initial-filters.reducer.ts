import { TReducerFunction, TReducerAction } from '@interfaces';
import { InitialFiltersResponse } from '@backend/models/InitialFiltersResponse';
import { EAppStateAction, TAppState } from '../app.state';

const reducerFn: TReducerFunction<TAppState, InitialFiltersResponse> = (state, payload) => {
	return { ...state, initialFiltersResponse: payload };
};

export const patchInitialFiltersReducerAction: TReducerAction<TAppState, InitialFiltersResponse> = {
	type: EAppStateAction.PatchInitialFilters,
	reducerFn,
};
