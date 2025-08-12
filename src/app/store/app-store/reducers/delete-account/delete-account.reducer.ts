import { Account } from '@backend/models';
import { TReducerFunction, TReducerAction } from '@core/interfaces';

import { TAppStore } from '../../TAppStore';
import { EAppStoreAction } from '../../EAppStoreAction';

const reducerFn: TReducerFunction<TAppStore, Account> = (state, payload) => {
	return { ...state, selectedAccounts: state.selectedAccounts.filter(account => account.id !== payload.id) };
};

export const deleteAccountReducerAction: TReducerAction<TAppStore, Account> = {
	type: EAppStoreAction.DeleteAccount,
	reducerFn,
};
