import { InjectionToken, Provider } from '@angular/core';
import { IHttpService } from '@interfaces/http-service';
import { HttpService } from './implementations/http.service';

export const HTTP_SERVICE_TOKEN = new InjectionToken<IHttpService>('HttpService');

export const HTTP_SERVICE_PROVIDER: Provider = {
	provide: HTTP_SERVICE_TOKEN,
	useExisting: HttpService,
};
