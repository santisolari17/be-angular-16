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

export class ControlledBackendError extends Error {
	public errorResponse: TBackendHttpErrorResponse;

	constructor(errorResponse: TBackendHttpErrorResponse) {
		super(errorResponse.message);
		this.errorResponse = errorResponse;

		Object.setPrototypeOf(this, ControlledBackendError.prototype);
	}
}

export class ControlledBackendException extends Error {
	public httpResponse: THttpServiceResponse<unknown>;

	constructor(httpResponse: THttpServiceResponse<unknown>) {
		super(httpResponse.mensajeNegocio || httpResponse.mensaje);
		this.httpResponse = httpResponse;

		Object.setPrototypeOf(this, ControlledBackendException.prototype);
	}
}

export interface IHttpService {
	httpRequest<T>(requestParams: THttpRequestParams): Observable<THttpServiceResponse<T>>;
}
