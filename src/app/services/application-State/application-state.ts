import { computed, signal, Signal, WritableSignal } from '@angular/core';
import { TReducerAction, TActionDispatch } from './application-state.models';

export abstract class ApplicationStateSlice<T> {
	readonly state: Signal<T>;
	private _state: WritableSignal<T>;
	private _reducerActions: TReducerAction<T>[];

	constructor(initialState: T, reducerActions: TReducerAction<T>[]) {
		this._state = signal(initialState);
		this.state = computed(() => this._state());
		this._reducerActions = reducerActions;
	}

	public select<K extends keyof T>(stateProperty: K): Signal<T[K]> {
		return computed(() => this._state()[stateProperty]);
	}

	public dispatchAction<K>(dispatched: TActionDispatch<K>): void {
		const reducer = this._reducerActions.find(r => r.type === dispatched.type);

		if (reducer) {
			this._state.set(reducer.reducerFn(this._state(), dispatched.payload));
		}
	}
}
