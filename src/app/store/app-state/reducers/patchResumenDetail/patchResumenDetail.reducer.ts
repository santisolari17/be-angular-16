import { ResumenDetail } from '@backend';
import { TAppState } from '../../model/TAppState';
import { TReducerAction, TReducerFunction } from '@services';
import { EAppStateAction } from '../../actions/EAppStateAction';

const reducerFn: TReducerFunction<TAppState, ResumenDetail[]> = (state, payload) => {
	return { ...state, resumenDetail: payload };
};

export const patchResumenDetailReducerAction: TReducerAction<TAppState, ResumenDetail[]> = {
	type: EAppStateAction.PatchResumenDetailData,
	reducerFn,
};
