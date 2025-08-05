import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { TAppAlertModalMesage } from 'src/app/components/app-alert-modal/types/TAppModalParams';
import { ControlledBackendError } from '../errors/ControlledBackendError';
import { ControlledBackendException } from '../errors/ControlledBackendException';

import { APPLICATION_NAME } from '@utils/constants';
import { ParentInteractorService } from 'beche-utils-lib';
import { AppAlertModalService } from '@components/app-alert-modal/app-alert-modal.service';
import { EAppAlertModalType } from '@components/app-alert-modal/enums/EAppModalType';
import { EBackendResponseType, IHttpService, THttpRequestParams, THttpServiceResponse } from 'src/app/interfaces/http-service.interface';

@Injectable({ providedIn: 'root' })
export class HttpService implements IHttpService {
	private _http = inject(HttpClient);
	private _alertModalService = inject(AppAlertModalService);
	private _parentInteractorService = inject(ParentInteractorService);

	public httpRequest<T>(requestParams: THttpRequestParams): Observable<THttpServiceResponse<T>> {
		return this._getHttpRequestObject<T>(requestParams).pipe(
			map(response => {
				this._catch200CodeResponseError(response);
				return response;
			}),
			catchError((error: ControlledBackendException | Error) => {
				this._backendErrorHandler(error);
				throw error;
			})
		);
	}

	private _getRequestHttpHeaders(requestParams: THttpRequestParams): HttpHeaders {
		return new HttpHeaders()
			.set('funcionalidad', requestParams.funcionalidad)
			.set('config-loader', 'true')
			.set('etapa', requestParams.etapa)
			.set('nombreAplicacion', APPLICATION_NAME);
	}

	private _getRequestHttpParams(requestParams: THttpRequestParams): HttpParams {
		let httpParams = new HttpParams();

		if (requestParams.params && requestParams.method === 'GET') {
			Object.keys(requestParams.params).forEach(key => {
				httpParams = httpParams.set(key, requestParams.params[key]);
			});
		}

		return httpParams;
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

	private _catch200CodeResponseError<T>(response: THttpServiceResponse<T>): void {
		if (response.resultado !== EBackendResponseType.Success) {
			throw new ControlledBackendException(response);
		}
	}

	private _backendErrorHandler(error: ControlledBackendException | Error): void {
		const defaultErrorMessage: TAppAlertModalMesage = {
			text: 'No se pudo completar su requerimiento. Por favor intente más tarde. Si el problema persiste, por favor contactar a Soporte Internet 600 660 0033.',
			topMarginLevel: 0,
		};
		const defaultOperationCodeMessageA: TAppAlertModalMesage = { text: 'ERR/A', topMarginLevel: 2 };
		const defaultOperationCodeMessageB: TAppAlertModalMesage = { text: 'ERR/B', topMarginLevel: 2 };

		try {
			if (error instanceof ControlledBackendException) {
				const clientMessage: TAppAlertModalMesage = error.httpResponse.mensajeNegocio
					? { text: error.httpResponse.mensajeNegocio, topMarginLevel: 0 }
					: defaultErrorMessage;
				const operationCodeMessage: TAppAlertModalMesage = error.httpResponse.codigoOperacion
					? { text: error.httpResponse.codigoOperacion, topMarginLevel: 2 }
					: defaultOperationCodeMessageA;

				this._alertModalService.showAppAlert({
					messages: [clientMessage, operationCodeMessage],
					modalType: error.httpResponse.resultado === EBackendResponseType.OperationalError ? EAppAlertModalType.Warning : EAppAlertModalType.Error,
					title: 'Error',
				});
				this._hideBeLoader();

				return;
			}

			if (error instanceof Error) {
				const backendError = new ControlledBackendError(JSON.parse(error.message));
				const clientMessage: TAppAlertModalMesage = backendError.errorResponse.error.mensajeNegocio
					? { text: backendError.errorResponse.error.mensajeNegocio, topMarginLevel: 0 }
					: defaultErrorMessage;
				const operationCodeMessage: TAppAlertModalMesage = backendError.errorResponse.error.codigoOperacion
					? { text: backendError.errorResponse.error.codigoOperacion, topMarginLevel: 2 }
					: defaultOperationCodeMessageA;

				this._alertModalService.showAppAlert({
					messages: [clientMessage, operationCodeMessage],
					modalType:
						backendError.errorResponse.error.resultado === EBackendResponseType.OperationalError
							? EAppAlertModalType.Warning
							: EAppAlertModalType.Error,
					title: 'Error',
				});
				this._hideBeLoader();

				return;
			}
		} catch (error) {
			this._alertModalService.showAppAlert({
				messages: [defaultErrorMessage, defaultOperationCodeMessageB],
				modalType: EAppAlertModalType.Error,
				title: 'Error',
			});
			this._hideBeLoader();
		}
	}

	private _hideBeLoader(): void {
		this._parentInteractorService.hideLoading();
	}
}
