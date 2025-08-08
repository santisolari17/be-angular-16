import { Observable } from 'rxjs';

export type THttpMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

export enum EBackendResponseType {
	Success = 'E',
	TechError = 'T',
	OperationalError = 'N',
}

export type TBackendHttpErrorResponse = {
	error: THttpServiceResponse<unknown>;
	message: string;
	name: string;
	status: number;
	statusText: string;
	url: string;
	ok: boolean;
};

export type THttpRequestParams = {
	requestLabel: string;
	url: string;
	funcionalidad: string;
	etapa: string;
	method: THttpMethod;
	body?: unknown;
	secuencia?: string;
	params?: unknown;
};

export type THttpServiceResponse<T> = {
	codigo: number;
	mensaje: string;
	resultado: EBackendResponseType;
	payload: T;
	codigoOperacion: string;
	mensajeNegocio?: string;
};

export interface IHttpService {
	httpRequest<T>(requestParams: THttpRequestParams): Observable<THttpServiceResponse<T>>;
}
