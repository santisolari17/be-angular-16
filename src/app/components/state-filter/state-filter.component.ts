import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IState } from '@interfaces/state.interface';
import { AsdCardComponent } from 'asd';

@Component({
	selector: 'be-state-filter',
	standalone: true,
	imports: [FormsModule, NgFor, AsdCardComponent],
	templateUrl: './state-filter.component.html',
	styleUrls: ['./state-filter.component.scss'],
})
export class StateFilterComponent {
	public selection: IState = null;
	@Input() states: IState[] = [];
	@Output() stateSelected: EventEmitter<IState> = new EventEmitter<IState>();

	/**
	 * The selectState function emits the selected state.
	 */
	selectState(): void {
		this.stateSelected.emit(this.selection);
	}
}
