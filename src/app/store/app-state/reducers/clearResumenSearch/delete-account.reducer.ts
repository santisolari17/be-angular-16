import { Account } from '@backend/models/Account';
import { TReducerFunction, TReducerAction } from '@interfaces';
import { EAppStateAction } from '@store/app-state/actions/EAppStateAction';
import { TAppState } from '@store/app-state/model/TAppState';

const reducerFn: TReducerFunction<TAppState, Account> = (state, payload) => {
	return { ...state, selectedAccounts: state.selectedAccounts.filter(account => account.id !== payload.id) };
};

export const deleteAccountReducerAction: TReducerAction<TAppState, Account> = {
	type: EAppStateAction.DeleteAccount,
	reducerFn,
};
