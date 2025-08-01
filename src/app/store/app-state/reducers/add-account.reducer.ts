import { TReducerAction, TReducerFunction } from '@services/application-state/application-state.models';
import { TAppState } from '../TAppState';
import { Account } from '@backend/models/Account';
import { EAppStateAction } from '../EAppStateAction';

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
