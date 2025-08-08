import { IReducerFactoryParams, TReducerAction, TReducerFunction } from '../interfaces/application-state-slice.interface';

export function createDynamicReducer<T, K>(params: IReducerFactoryParams<T>): TReducerAction<T, K> {
	const reducerFn: TReducerFunction<T, K> = (state, payload) => {
		return { ...state, [params.propertyName]: payload };
	};

	return {
		type: params.type,
		reducerFn,
	};
}
