import { Account } from '@backend/models/Account';
import { TReducerFunction, TReducerAction } from '@interfaces';
import { EAppStateAction } from '@store/app-state/EAppStateActions';
import { TAppState } from '@store/app-state/TAppState';

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
