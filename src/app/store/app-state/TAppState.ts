import { Account } from '@backend/models/Account';
import { InitialFiltersResponse } from '@backend/models/InitialFiltersResponse';

export type TAppState = {
	initialFiltersResponse: InitialFiltersResponse;
	selectedAccounts: Account[];
};
