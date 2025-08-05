/* eslint-disable @typescript-eslint/no-explicit-any */

import { THttpServiceResponse } from 'src/app/interfaces/http-service.interface';

export class ControlledBackendException extends Error {
	public httpResponse: THttpServiceResponse<any>;

	constructor(httpResponse: THttpServiceResponse<any>) {
		super(httpResponse.mensajeNegocio || httpResponse.mensaje);
		this.httpResponse = httpResponse;

		Object.setPrototypeOf(this, ControlledBackendException.prototype);
	}
}
