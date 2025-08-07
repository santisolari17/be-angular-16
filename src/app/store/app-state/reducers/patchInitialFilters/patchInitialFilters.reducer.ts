import { InitialFiltersResponse } from '@backend/models/InitialFiltersResponse';
import { TReducerAction, TReducerFunction } from '@interfaces';
import { EAppStateAction } from '@store/app-state/actions/EAppStateAction';
import { TAppState } from '@store/app-state/model/TAppState';

const reducerFn: TReducerFunction<TAppState, InitialFiltersResponse> = (state, payload) => {
	return { ...state, initialFiltersResponse: payload };
};

export const patchInitialFiltersReducerAction: TReducerAction<TAppState, InitialFiltersResponse> = {
	type: EAppStateAction.PatchInitialFilters,
	reducerFn,
};
