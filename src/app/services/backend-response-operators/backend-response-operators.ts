import { inject, Injectable } from '@angular/core';
import { HTTP_SERVICE_TOKEN, IHttpService, THttpRequestParams, THttpServiceResponse } from '@interfaces/http';
import { ClassEntityValidatorService } from '@services/class-entity-validator/class-entity-validator.service';
import { OperatorFunction, mergeMap, from, toArray, catchError, ObservedValueOf, of, Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class BackendResponseOperators {
	private _http = inject<IHttpService>(HTTP_SERVICE_TOKEN);
	private _entityValidator = inject(ClassEntityValidatorService);

	protected execBackendCall<T>(requestParams: THttpRequestParams, ResponseEntity: new (params: unknown) => T): Observable<T> {
		const backendCall$: Observable<THttpServiceResponse<T>> = this._http.httpRequest(requestParams);
		return backendCall$.pipe(
			map(response => new ResponseEntity(response.payload)),
			this._responseRxOperator(requestParams.requestLabel)
		);
	}

	protected execBackendCallArrayResponse<T>(requestParams: THttpRequestParams, ResponseEntity: new (params: unknown) => T): Observable<T[]> {
		const backendCall$: Observable<THttpServiceResponse<T[]>> = this._http.httpRequest(requestParams);
		return backendCall$.pipe(
			map(response => response.payload.map(el => new ResponseEntity(el))),
			this._arrayResponseRxOperator(requestParams.requestLabel)
		);
	}

	private _arrayResponseRxOperator<T>(methodName: string): OperatorFunction<T[], T[]> {
		return mergeMap(list =>
			from(list).pipe(
				mergeMap(async entity => {
					await this._entityValidator.validate(entity as object);
					return entity;
				}),
				toArray(),
				this._handleBackendCallErrorRxOperator(methodName)
			)
		);
	}

	private _responseRxOperator<T>(methodName: string): OperatorFunction<T, T> {
		return mergeMap(entity =>
			of(entity).pipe(
				mergeMap(async entity => {
					await this._entityValidator.validate(entity as object);
					return entity;
				}),
				this._handleBackendCallErrorRxOperator(methodName)
			)
		);
	}

	private _handleBackendCallErrorRxOperator<T>(methodName: string): OperatorFunction<T, T | ObservedValueOf<never>> {
		return catchError(err => {
			console.error(`[BackendResponse Error Detail] calling resource with method "${methodName}" resulted with an error.`, err);
			throw err;
		});
	}
}
