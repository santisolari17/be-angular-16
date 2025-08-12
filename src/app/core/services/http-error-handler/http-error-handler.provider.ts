import { InjectionToken, Provider } from '@angular/core';
import { IHttpErrorHandler } from '../../interfaces/http-error-handler.interface';
import { HttpErrorHandlerService } from './implementations/http-error-henadler.service';

export const HTTP_ERROR_HANDLER_TOKEN = new InjectionToken<IHttpErrorHandler>('HttpErrorHandler');

export const HTTP_ERROR_HANDLER_PROVIDER: Provider = {
	provide: HTTP_ERROR_HANDLER_TOKEN,
	useExisting: HttpErrorHandlerService,
};
