import { ControlledBackendException } from '../services/http-error-handler/errors/ControlledBackendException';
import { THttpServiceResponse } from './http-service.interface';

export interface IHttpErrorHandler {
	handleHttpError(error: ControlledBackendException | Error): void;
	catch200CodeResponseError(response: THttpServiceResponse<unknown>): void;
}
