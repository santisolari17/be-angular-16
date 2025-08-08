import { InitialFiltersResponse } from '@backend/models/InitialFiltersResponse';
import { TReducerAction, TReducerFunction } from '@interfaces';
import { TAppState } from '../../TAppState';
import { EAppStateAction } from '../../EAppStateAction';

const reducerFn: TReducerFunction<TAppState, InitialFiltersResponse> = (state, payload) => {
	return { ...state, initialFiltersResponse: payload };
};

export const patchInitialFiltersReducerAction: TReducerAction<TAppState, InitialFiltersResponse> = {
	type: EAppStateAction.PatchInitialFilters,
	reducerFn,
};
