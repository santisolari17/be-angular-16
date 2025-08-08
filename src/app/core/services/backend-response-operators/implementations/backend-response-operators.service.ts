import { inject, Injectable } from '@angular/core';
import { OperatorFunction, mergeMap, from, toArray, catchError, ObservedValueOf, of, Observable, map } from 'rxjs';
import { THttpServiceResponse, THttpRequestParams, IHttpService } from '../../../interfaces/http-service.interface';
import { IBackendResponseOperators } from 'src/app/core/interfaces/backend-response.operators.interface';
import { IClassEntityValidator } from '../../../interfaces/class-entity-validator.interface';
import { HTTP_SERVICE_TOKEN } from '../../http/http-service.provider';
import { CLASS_ENTITY_VALIDATOR_TOKEN } from '../../class-entity-validator/class-entity-validator.provider';

@Injectable({ providedIn: 'root' })
export abstract class BackendResponseOperatorsService implements IBackendResponseOperators {
	private _http = inject<IHttpService>(HTTP_SERVICE_TOKEN);
	private _entityValidator = inject<IClassEntityValidator>(CLASS_ENTITY_VALIDATOR_TOKEN);

	public execBackendCall<T>(requestParams: THttpRequestParams, ResponseEntity: new (params: unknown) => T): Observable<T> {
		const backendCall$: Observable<THttpServiceResponse<T>> = this._http.httpRequest(requestParams);
		return backendCall$.pipe(
			map(response => new ResponseEntity(response.payload)),
			this._responseRxOperator(requestParams.requestLabel)
		);
	}

	public execBackendCallArrayResponse<T>(requestParams: THttpRequestParams, ResponseEntity: new (params: unknown) => T): Observable<T[]> {
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
