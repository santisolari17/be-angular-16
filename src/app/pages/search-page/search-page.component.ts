import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { StateFilterComponent } from '@components/state-filter/state-filter.component';
import { IState } from '@interfaces/state.interface';
import { ExampleBffService } from '@services/example-bff.service';
import { SignalsService } from '@services/signals.service';
import { AsdButtonComponent, AsdCardComponent } from 'asd';

const ARANDANO = [AsdButtonComponent, AsdCardComponent];
@Component({
	selector: 'be-search-page',
	standalone: true,
	imports: [NgIf, StateFilterComponent, ...ARANDANO],
	templateUrl: './search-page.component.html',
	styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
	public states: IState[] = [];
	public stateSelected: IState;
	private _exampleBffService = inject(ExampleBffService);
	private _signalsService: SignalsService = inject(SignalsService);

	ngOnInit(): void {
		this.getFilters();
	}

	/**
	 * The function "getFilters" retrieves filters from a service and updates the states variable with the
	 * retrieved data.
	 */
	getFilters(): void {
		this._exampleBffService.getFilters().subscribe({
			next: ({ estados }) => {
				this._signalsService.showExportBtn(true);
				this.states = estados;
			},
		});
	}

	/**
	 * The function saves the selected state in the stateSelected variable.
	 * @param {IState} state - The parameter "state" is of type "IState".
	 */
	saveStateSelected(state: IState): void {
		this.stateSelected = state;
	}
}
