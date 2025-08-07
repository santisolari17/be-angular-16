import { TAppState } from '../../model/TAppState';
import { TMakeExcelFileParams, TReducerAction, TReducerFunction } from '@services';
import { EAppStateAction } from '../../actions/EAppStateAction';

const reducerFn: TReducerFunction<TAppState, TMakeExcelFileParams> = (state, payload) => {
	return { ...state, excelResumenData: payload };
};

export const patchExcelResumenDataReducerAction: TReducerAction<TAppState, TMakeExcelFileParams> = {
	type: EAppStateAction.PatchExcelDataForResumenTabSearch,
	reducerFn,
};
