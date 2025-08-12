import { InitialFiltersResponse, Account } from '@backend/models';

export type TAppStore = {
	initialFiltersResponse: InitialFiltersResponse;
	selectedAccounts: Account[];
};
