import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '@backend/backend.service';
import { Accounts } from '@backend/models/Accounts';
import { AccountsRequestBody } from '@backend/models/AccountsRequestBody';
import { OptionList } from '@backend/models/OptionList';
import { AppState } from '@store/app-state/app.state';
import { EAppStateAction } from '@store/app-state/EAppStateAction';
import { AsdButtonComponent, AsdCardComponent, AsdHeadtitleComponent, IconModule, InputModule, MonedaModule, SelectModule, TableModule } from 'asd';
import { take } from 'rxjs';
import { TAppResolverData } from 'src/app/app.resolver';

const ARANDANO = [AsdButtonComponent, AsdCardComponent, SelectModule, InputModule, TableModule, MonedaModule, AsdHeadtitleComponent, IconModule];

@Component({
	selector: 'be-index-page',
	standalone: true,
	imports: [CommonModule, ...ARANDANO],
	templateUrl: './index-page.component.html',
	styleUrls: ['./index-page.component.scss'],
})
export class IndexPageComponent implements OnInit {
	public showResultTable: WritableSignal<boolean> = signal(false);
	public options: Signal<OptionList[]>;
	public tableDatasource: WritableSignal<Accounts[]> = signal([]);

	private _route = inject(ActivatedRoute);
	private _appState = inject(AppState);
	private _backendService = inject(BackendService);

	ngOnInit(): void {
		const resolvedData: TAppResolverData = this._route.snapshot.data['indexPageResolver'];
		this._appState.dispatchAction({ type: EAppStateAction.PatchInitialFilters, payload: resolvedData.initialFilters });
		this.options = computed(() => resolvedData.initialFilters.optionList);
	}

	public submit(): void {
		const requestBody = new AccountsRequestBody('hola');
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

	public handleSelectValue($event): void {
		console.log('🚀 ~ CodeSelectComponent ~ selectValue ~ $event:', $event);
	}

	public handleOptionSelected($event): void {
		console.log('🚀 ~ CodeSelectComponent ~ optionSelected ~ $event:', $event);
	}
}
