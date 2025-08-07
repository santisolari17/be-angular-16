import { TAppState } from '../../model/TAppState';
import { TReducerAction, TReducerFunction } from '@services';
import { EAppStateAction } from '../../actions/EAppStateAction';
import { TResumenSearchState } from '@pages/tab-page/tab-pages/resumen-page/resumen-page-form/types/TResumenSearchState';

const reducerFn: TReducerFunction<TAppState, TResumenSearchState> = (state, payload) => {
	return {
		...state,
		resumenSearch: {
			formDate: payload.formDate,
			toDate: payload.toDate,
			searchResult: payload.searchResult.map(r => ({ ...r })),
		},
	};
};

export const PatchResumenFormAndSearchResultReducerAction: TReducerAction<TAppState, TResumenSearchState> = {
	type: EAppStateAction.PatchResumenFormAndSearchResult,
	reducerFn,
};
