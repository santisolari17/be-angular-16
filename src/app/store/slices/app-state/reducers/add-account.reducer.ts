import { Account } from '@backend/models/Account';
import { EAppStateAction, TAppState } from '../app.state';
import { TReducerFunction, TReducerAction } from '@interfaces';

const reducerFn: TReducerFunction<TAppState, Account> = (state, payload) => {
	const found = state.selectedAccounts.find(account => account.id === payload.id);

	if (found) {
		return state;
	}

	const newAccountArray = [...state.selectedAccounts.map(acc => ({ ...acc })), payload];
	return { ...state, selectedAccounts: newAccountArray };
};

export const addAccountReducerAction: TReducerAction<TAppState, Account> = {
	type: EAppStateAction.AddAccount,
	reducerFn,
};
