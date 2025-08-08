import { Observable } from 'rxjs';
import { THttpRequestParams } from './http-service.interface';

export interface IBackendResponseOperators {
	execBackendCall<T>(requestParams: THttpRequestParams, ResponseEntity: new (params: unknown) => T): Observable<T>;
	execBackendCallArrayResponse<T>(requestParams: THttpRequestParams, ResponseEntity: new (params: unknown) => T): Observable<T[]>;
}
