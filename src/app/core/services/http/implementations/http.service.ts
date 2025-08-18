import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';

import { APPLICATION_NAME } from '@utils/constants';
import { IHttpErrorHandler } from '../../../interfaces/http-error-handler.interface';
import { IHttpService, THttpHeaders, THttpRequestParams, THttpServiceResponse } from '../../../interfaces/http-service.interface';
import { HTTP_ERROR_HANDLER_TOKEN } from '../../http-error-handler/http-error-handler.provider';

@Injectable({ providedIn: 'root' })
export class HttpService implements IHttpService {
	private _http = inject(HttpClient);
	private _httpErrorHanlder = inject<IHttpErrorHandler>(HTTP_ERROR_HANDLER_TOKEN);

	public httpRequest<T>(requestParams: THttpRequestParams): Observable<THttpServiceResponse<T>> {
		return this._getHttpRequestObject<T>(requestParams).pipe(
			map(response => {
				this._httpErrorHanlder.catch200CodeResponseError(response);
				return response;
			}),
			catchError((error: Error) => {
				this._httpErrorHanlder.handleHttpError(error);
				throw error;
			})
		);
	}

	private _getRequestHttpHeaders(requestParams: THttpRequestParams): HttpHeaders {
		const fixedHeaders: THttpHeaders[] = [
			{ headerName: 'funcionalidad', value: requestParams.funcionalidad },
			{ headerName: 'config-loader', value: 'true' },
			{ headerName: 'etapa', value: requestParams.etapa },
			{ headerName: 'nombreAplicacion', value: APPLICATION_NAME },
		];
		const customHeaders = requestParams.headers || [];

		const headersDefinition: THttpHeaders[] = [...fixedHeaders, ...customHeaders];

		const httpHeaders = headersDefinition.reduce((headers, { headerName, value }) => headers.set(headerName, value), new HttpHeaders());

		return httpHeaders;
	}

	private _getRequestHttpParams(requestParams: THttpRequestParams): HttpParams {
		const queryParams = requestParams.queryParams || [];

		if (queryParams.length > 0) {
			return queryParams.reduce((params, { paramName, value }) => params.set(paramName, value), new HttpParams());
		}

		return new HttpParams();
	}

	private _getHttpRequestObject<T>(requestParams: THttpRequestParams): Observable<THttpServiceResponse<T>> {
		const headers = this._getRequestHttpHeaders(requestParams);
		const params = this._getRequestHttpParams(requestParams);

		const httpClientMethodSwitch = {
			GET: this._http.get<THttpServiceResponse<T>>(requestParams.url, { headers, params }),
			DELETE: this._http.delete<THttpServiceResponse<T>>(requestParams.url, { headers, params }),
			POST: this._http.post<THttpServiceResponse<T>>(requestParams.url, requestParams.body, { headers, params }),
			PUT: this._http.put<THttpServiceResponse<T>>(requestParams.url, requestParams.body, { headers, params }),
			PATCH: this._http.patch<THttpServiceResponse<T>>(requestParams.url, requestParams.body, { headers, params }),
		};

		return httpClientMethodSwitch[requestParams.method];
	}
}
