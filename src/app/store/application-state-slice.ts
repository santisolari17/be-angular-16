import { computed, signal, Signal, WritableSignal } from '@angular/core';
import { TReducerAction, TActionDispatch, IApplicationStateSlice } from '@interfaces';
import _ from 'lodash';

export abstract class ApplicationStateSlice<T> implements IApplicationStateSlice<T> {
	readonly state: Signal<T>;
	private _state: WritableSignal<T>;
	private _reducerActions: TReducerAction<T>[];

	constructor(initialState: T, reducerActions: TReducerAction<T>[]) {
		this._state = signal(initialState);
		this._reducerActions = reducerActions;
	}

	public select<K extends keyof T>(stateProperty: K): Signal<T[K]> {
		return computed(() => _.cloneDeep(this._state()[stateProperty]));
	}

	public dispatchAction<K>(dispatched: TActionDispatch<K>): void {
		const reducer = this._reducerActions.find(r => r.type === dispatched.type);

		if (reducer) {
			this._state.set(reducer.reducerFn(this._state(), dispatched.payload));
		}
	}
}
