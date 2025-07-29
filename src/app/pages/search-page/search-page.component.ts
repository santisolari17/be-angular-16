import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptionList } from '@backend/models/OptionList.entity';
import { AppState } from '@store/app-state/app.state';
import { EAppStateAction } from '@store/app-state/EAppStateAction';
import { AsdButtonComponent, AsdCardComponent } from 'asd';
import { TAppResolverData } from 'src/app/app.resolver';

const ARANDANO = [AsdButtonComponent, AsdCardComponent];
@Component({
	selector: 'be-search-page',
	standalone: true,
	imports: [CommonModule, ...ARANDANO],
	templateUrl: './search-page.component.html',
	styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
	public options: Signal<OptionList[]>;

	private _route = inject(ActivatedRoute);
	private _appState = inject(AppState);

	ngOnInit(): void {
		const resolvedData: TAppResolverData = this._route.snapshot.data['indexPageResolver'];
		this._appState.dispatchAction({ type: EAppStateAction.PatchInitialFilters, payload: resolvedData.initialFilters });
		this.options = computed(() => resolvedData.initialFilters.optionList);
	}
}
