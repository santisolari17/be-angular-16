import { Account } from '@backend/models';
import { TReducerFunction, TReducerAction } from '@core/interfaces';

import { TAppStore } from '../../TAppStore';
import { EAppStoreAction } from '../../EAppStoreAction';

const reducerFn: TReducerFunction<TAppStore, Account> = (state, payload) => {
	const found = state.selectedAccounts.find(account => account.id === payload.id);

	if (found) {
		return state;
	}

	const newAccountArray = [...state.selectedAccounts.map(acc => ({ ...acc })), payload];
	return { ...state, selectedAccounts: newAccountArray };
};

export const addAccountReducerAction: TReducerAction<TAppStore, Account> = {
	type: EAppStoreAction.AddAccount,
	reducerFn,
};
