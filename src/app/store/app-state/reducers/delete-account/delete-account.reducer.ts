import { Account } from '@backend/models/Account';
import { TReducerFunction, TReducerAction } from '@interfaces';
import { EAppStateAction } from '@store/app-state/EAppStateActions';
import { TAppState } from '@store/app-state/TAppState';

const reducerFn: TReducerFunction<TAppState, Account> = (state, payload) => {
	return { ...state, selectedAccounts: state.selectedAccounts.filter(account => account.id !== payload.id) };
};

export const deleteAccountReducerAction: TReducerAction<TAppState, Account> = {
	type: EAppStateAction.DeleteAccount,
	reducerFn,
};
