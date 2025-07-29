import { EHttpMethod } from '../enums/EHttpMethod';

export type THttpRequestParams = {
	requestLabel: string;
	url: string;
	funcionalidad: string;
	etapa: string;
	method: EHttpMethod;
	body?: unknown;
	secuencia?: string;
	params?: unknown;
};
