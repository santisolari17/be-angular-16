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
