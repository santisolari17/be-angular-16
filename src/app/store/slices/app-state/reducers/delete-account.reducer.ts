import { Account } from '@backend/models/Account';
import { TReducerFunction, TReducerAction } from '@interfaces';
import { TAppState, EAppStateAction } from '../app.state';

const reducerFn: TReducerFunction<TAppState, Account> = (state, payload) => {
	return { ...state, selectedAccounts: state.selectedAccounts.filter(account => account.id !== payload.id) };
};

export const deleteAccountReducerAction: TReducerAction<TAppState, Account> = {
	type: EAppStateAction.DeleteAccount,
	reducerFn,
};
