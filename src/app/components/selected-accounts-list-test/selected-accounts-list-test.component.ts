import { CommonModule } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';

import * as _ from 'lodash';
import { AsdAlertComponent, AsdButtonComponent, AsdCardComponent, IconModule, InputModule, MonedaModule, SelectModule, TableModule } from 'asd';

import { Account } from '@backend/models';
import { AppStore, EAppStoreAction } from '@store';

const ARANDANO = [AsdCardComponent, TableModule, SelectModule, InputModule, MonedaModule, AsdAlertComponent, IconModule, AsdButtonComponent];

@Component({
	selector: 'be-selected-accounts-list-test',
	standalone: true,
	imports: [CommonModule, ...ARANDANO],
	templateUrl: './selected-accounts-list-test.component.html',
	styleUrls: ['./selected-accounts-list-test.component.scss'],
})
export class SelectedAccountsListTestComponent {
	public datasource: Signal<Account[][]>;
	public accountTotals: Signal<{ [currency: string]: number }>;
	public selected: Signal<boolean>;

	private _appStore = inject(AppStore);

	constructor() {
		this.datasource = computed(() => Object.values(_.groupBy(this._appStore.select('selectedAccounts')(), 'currency')));
		this.selected = computed(() => this._appStore.select('selectedAccounts')().length > 0);
		this.accountTotals = computed(() =>
			_.chain(this._appStore.select('selectedAccounts')())
				.groupBy('currency')
				.mapValues(accounts => _.sumBy(accounts, 'balance'))
				.value()
		);
	}

	public deleteAccount(account: Account): void {
		this._appStore.dispatchAction({ type: EAppStoreAction.DeleteAccount, payload: account });
	}
}
