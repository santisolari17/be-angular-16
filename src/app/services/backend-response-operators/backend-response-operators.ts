import { inject, Injectable } from '@angular/core';
import { ClassEntityValidatorService } from '@services/class-entity-validator/class-entity-validator.service';
import { HttpService } from '@services/http/http.service';
import { THttpRequestParams } from '@services/http/types/THttpRequestParams';
import { THttpServiceResponse } from '@services/http/types/THttpServiceResponse';
import { OperatorFunction, mergeMap, from, toArray, catchError, ObservedValueOf, of, Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class BackendResponseOperators {
	private _http = inject(HttpService);
	private _entityValidator = inject(ClassEntityValidatorService);

	public execBackendCall<T>(requestParams: THttpRequestParams, ResponseEntity: new (params: unknown) => T): Observable<T> {
		const backendCall$: Observable<THttpServiceResponse<T>> = this._http.httpRequest(requestParams);
		return backendCall$.pipe(
			map(response => new ResponseEntity(response.payload)),
			this.responseRxOperator(requestParams.requestLabel)
		);
	}

	public arrayResponseRxOperator<T>(methodName: string): OperatorFunction<T[], T[]> {
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

	public responseRxOperator<T>(methodName: string): OperatorFunction<T, T> {
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
