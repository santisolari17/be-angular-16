import { TBackendHttpErrorResponse } from '../types/TBackendHttpError';

export class ControlledBackendError extends Error {
	public errorResponse: TBackendHttpErrorResponse;

	constructor(errorResponse: TBackendHttpErrorResponse) {
		super(errorResponse.message);
		this.errorResponse = errorResponse;

		Object.setPrototypeOf(this, ControlledBackendError.prototype);
	}
}
