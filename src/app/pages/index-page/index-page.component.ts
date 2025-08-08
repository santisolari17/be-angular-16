import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, WritableSignal, signal, Signal, inject, computed } from '@angular/core';

import dayjs from 'dayjs';
import { take } from 'rxjs';
import { AsdButtonComponent, AsdCardComponent, SelectModule, InputModule, TableModule, MonedaModule, AsdHeadtitleComponent, IconModule } from 'asd';

import { BackendService } from '@backend/service';
import { AppStore, EAppStoreAction } from '@store';
import { IExcelGenerator, TMakeExcelFileParams } from '@core/interfaces';
import { Account, AccountsRequestBody, OptionList } from '@backend/models';
import { SelectedAccountsListTestComponent } from '@components/selected-accounts-list-test/selected-accounts-list-test.component';

import { TAppResolverData } from 'src/app/app.resolver';
import { EXCEL_GENERATOR_SERVICE_TOKEN } from 'src/app/core/services/excel-generator/excel-generator.provider';

const ARANDANO = [AsdButtonComponent, AsdCardComponent, SelectModule, InputModule, TableModule, MonedaModule, AsdHeadtitleComponent, IconModule];
const APP_COMPONENTS = [SelectedAccountsListTestComponent];

@Component({
	selector: 'be-index-page',
	standalone: true,
	imports: [CommonModule, ...APP_COMPONENTS, ...ARANDANO],
	templateUrl: './index-page.component.html',
	styleUrls: ['./index-page.component.scss'],
})
export class IndexPageComponent implements OnInit {
	public showResultTable: WritableSignal<boolean> = signal(false);
	public options: Signal<OptionList[]>;
	public tableDatasource: WritableSignal<Account[]> = signal([]);
	public selectedOption: WritableSignal<OptionList> = signal(null);

	private _route = inject(ActivatedRoute);
	private _appStore = inject(AppStore);
	private _backendService = inject(BackendService);
	private _excelGenerator = inject<IExcelGenerator>(EXCEL_GENERATOR_SERVICE_TOKEN);

	ngOnInit(): void {
		const resolvedData: TAppResolverData = this._route.snapshot.data['indexPageResolver'];
		this._appStore.dispatchAction({ type: EAppStoreAction.PatchInitialFilters, payload: resolvedData.initialFilters });
		this.options = computed(() => resolvedData.initialFilters.optionList);
		this.selectedOption.set(this.options()[0]);
	}

	public submit(): void {
		const requestBody = new AccountsRequestBody(this.selectedOption().id);
		this._backendService
			.getAccounts(requestBody)
			.pipe(take(1))
			.subscribe({
				next: accounts => {
					this.tableDatasource.set(accounts);
					this.showResultTable.set(true);
				},
			});
	}

	public dataClickedHanlder(dataRow: Account): void {
		this._appStore.dispatchAction({ type: EAppStoreAction.AddAccount, payload: dataRow });
	}

	public optionSelectedHandler(option: OptionList): void {
		this.selectedOption.set(option);
	}

	public exportExcel(): void {
		const fileRowsHeaders = ['Número Cuenta', 'Titular', 'Cuenta', 'Tarjeta Crédito', 'Moneda', 'Saldo', 'Ultima Transacción'];

		const fileRows: string[][] = this.tableDatasource().map(row => [
			row.accountNumber,
			row.accountOwner,
			row.accountName,
			row.creditCardIssuer,
			row.currency,
			row.balance.toString(),
			dayjs(row.lastTransactionDate).format('DD/MM/YYYY'),
		]);

		const excelFileParams: TMakeExcelFileParams = {
			corporateHeaderSheetName: 'Encabezado',
			corpotateHeaderSheetDataBlock: [
				{
					subtitle: 'Consulta de cuentas',
					dataRows: [
						{
							rowTitle: 'Tipo de cuentas',
							rowValue: this.selectedOption().description,
						},
					],
				},
			],
			dataSheetName: 'ListaCuentas',
			dataSheetHeaders: fileRowsHeaders,
			dataSheetRows: fileRows,
			filename: 'ListaCuentas',
			addHeaderUserRutToFilename: true,
			addDateStringToFilename: true,
		};

		this._excelGenerator.makeExcelFile(excelFileParams);
	}
}
