import { TReducerAction, TReducerFunction } from '@services/application-state/application-state.models';
import { TAppState } from '../TAppState';
import { Account } from '@backend/models/Account';
import { EAppStateAction } from '../EAppStateAction';

const reducerFn: TReducerFunction<TAppState, Account> = (state, payload) => {
	return { ...state, selectedAccounts: state.selectedAccounts.filter(account => account.id !== payload.id) };
};

export const deleteAccountReducerAction: TReducerAction<TAppState, Account> = {
	type: EAppStateAction.DeleteAccount,
	reducerFn,
};
