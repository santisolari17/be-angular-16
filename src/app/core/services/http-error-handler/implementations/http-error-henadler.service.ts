import { inject, Injectable } from '@angular/core';
import { ControlledBackendException } from '../errors/ControlledBackendException';
import { TAppAlertModalMesage } from '../../../components/app-alert-modal/types/TAppModalParams';
import { ControlledBackendError } from '../errors/ControlledBackendError';
import { EAppAlertModalType } from '../../../components/app-alert-modal/enums/EAppModalType';
import { EBackendResponseType, THttpServiceResponse } from '../../../interfaces/http-service.interface';
import { AppAlertModalService } from '../../../components/app-alert-modal/app-alert-modal.service';
import { ParentInteractorService } from 'beche-utils-lib';
import { IHttpErrorHandler } from '../../../interfaces/http-error-handler.interface';

@Injectable({ providedIn: 'root' })
export class HttpErrorHandlerService implements IHttpErrorHandler {
	private _alertModalService = inject(AppAlertModalService);
	private _parentInteractorService = inject(ParentInteractorService);

	public catch200CodeResponseError<T>(response: THttpServiceResponse<T>): void {
		if (response.resultado !== EBackendResponseType.Success) {
			throw new ControlledBackendException(response);
		}
	}

	public handleHttpError(error: ControlledBackendException | Error): void {
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
