import { Component, computed, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsdAlertComponent, AsdButtonComponent, AsdCardComponent, IconModule, InputModule, MonedaModule, SelectModule, TableModule } from 'asd';
import { Account } from '@backend/models/Account';
import * as _ from 'lodash';
import { AppState, EAppStateAction } from '@store/slices/app-state/app.state';

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

	private _appState = inject(AppState);

	constructor() {
		this.datasource = computed(() => Object.values(_.groupBy(this._appState.select('selectedAccounts')(), 'currency')));
		this.selected = computed(() => this._appState.select('selectedAccounts')().length > 0);
		this.accountTotals = computed(() =>
			_.chain(this._appState.select('selectedAccounts')())
				.groupBy('currency')
				.mapValues(accounts => _.sumBy(accounts, 'balance'))
				.value()
		);
	}

	public deleteAccount(account: Account): void {
		this._appState.dispatchAction({ type: EAppStateAction.DeleteAccount, payload: account });
	}
}
