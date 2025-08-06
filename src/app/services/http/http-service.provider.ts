import { InjectionToken, Provider } from '@angular/core';
import { HttpService } from './implementations/http.service';
import { IHttpService } from '@interfaces';

export const HTTP_SERVICE_TOKEN = new InjectionToken<IHttpService>('HttpService');

export const HTTP_SERVICE_PROVIDER: Provider = {
	provide: HTTP_SERVICE_TOKEN,
	useExisting: HttpService,
};
