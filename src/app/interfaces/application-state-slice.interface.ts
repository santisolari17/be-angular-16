import { Signal } from '@angular/core';

export type TReducerFunction<T, K = unknown> = (state: T, payload?: K) => T;

export type TReducerAction<T, K = unknown> = {
	type: string;
	reducerFn: TReducerFunction<T, K>;
};

export type TActionDispatch<T> = {
	type: string;
	payload?: T;
};

export type TActionIdentifier = {
	name: string;
	type: string;
};

export type IReducerFactoryParams<T> = {
	type: string;
	propertyName: keyof T;
};

export interface IApplicationStateSlice<T> {
	select<K extends keyof T>(stateProperty: K): Signal<T[K]>;
	dispatchAction<K>(dispatched: TActionDispatch<K>): void;
}
