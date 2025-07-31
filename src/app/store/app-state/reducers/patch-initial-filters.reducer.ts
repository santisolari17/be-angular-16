import { TReducerFunction, TReducerAction } from '@services/application-state/application-state.models';
import { TAppState } from '../TAppState';
import { InitialFiltersResponse } from '@backend/models/InitialFiltersResponse';
import { EAppStateAction } from '../EAppStateAction';

const reducerFn: TReducerFunction<TAppState, InitialFiltersResponse> = (state, payload) => {
	return { ...state, initialFiltersResponse: payload };
};

export const patchInitialFiltersReducerAction: TReducerAction<TAppState, InitialFiltersResponse> = {
	type: EAppStateAction.PatchInitialFilters,
	reducerFn,
};
