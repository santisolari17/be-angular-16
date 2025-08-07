import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '@backend/backend.service';
import { Account } from '@backend/models/Account';
import { AccountsRequestBody } from '@backend/models/AccountsRequestBody';
import { OptionList } from '@backend/models/OptionList';
import { SelectedAccountsListTestComponent } from '@components/selected-accounts-list-test/selected-accounts-list-test.component';
import { IExcelGenerator, TMakeExcelFileParams } from 'src/app/interfaces/_index_';
import { EXCEL_GENERATOR_SERVICE_TOKEN } from '@services/excel-generator/excel-generator.provider';
import { AsdButtonComponent, AsdCardComponent, AsdHeadtitleComponent, IconModule, InputModule, MonedaModule, SelectModule, TableModule } from 'asd';
import dayjs from 'dayjs';
import { take } from 'rxjs';
import { TAppResolverData } from 'src/app/app.resolver';
import { AppState } from '@store/app-state/Application.state';
import { EAppStateAction } from '@store/app-state/EAppStateActions';

const ARANDANO = [AsdButtonComponent, AsdCardComponent, SelectModule, InputModule, TableModule, MonedaModule, AsdHeadtitleComponent, IconModule];

@Component({
	selector: 'be-index-page',
	standalone: true,
	imports: [CommonModule, SelectedAccountsListTestComponent, ...ARANDANO],
	templateUrl: './index-page.component.html',
	styleUrls: ['./index-page.component.scss'],
})
export class IndexPageComponent implements OnInit {
	public showResultTable: WritableSignal<boolean> = signal(false);
	public options: Signal<OptionList[]>;
	public tableDatasource: WritableSignal<Account[]> = signal([]);
	public selectedOption: WritableSignal<OptionList> = signal(null);

	private _route = inject(ActivatedRoute);
	private _appState = inject(AppState);
	private _backendService = inject(BackendService);
	private _excelGenerator = inject<IExcelGenerator>(EXCEL_GENERATOR_SERVICE_TOKEN);

	ngOnInit(): void {
		const resolvedData: TAppResolverData = this._route.snapshot.data['indexPageResolver'];
		this._appState.dispatchAction({ type: EAppStateAction.PatchInitialFilters, payload: resolvedData.initialFilters });
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
		this._appState.dispatchAction({ type: EAppStateAction.AddAccount, payload: dataRow });
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
