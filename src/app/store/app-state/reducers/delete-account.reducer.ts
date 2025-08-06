import { TAppState } from '../TAppState';
import { Account } from '@backend/models/Account';
import { EAppStateAction } from '../EAppStateAction';
import { TReducerAction, TReducerFunction } from 'src/app/services/application-state/application-state.models';

const reducerFn: TReducerFunction<TAppState, Account> = (state, payload) => {
	return { ...state, selectedAccounts: state.selectedAccounts.filter(account => account.id !== payload.id) };
};

export const deleteAccountReducerAction: TReducerAction<TAppState, Account> = {
	type: EAppStateAction.DeleteAccount,
	reducerFn,
};
