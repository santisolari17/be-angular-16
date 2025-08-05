import { Provider } from '@angular/core';
import { HTTP_SERVICE_TOKEN } from '@interfaces/http';
import { HttpService } from './implementations/http.service';

export const HTTP_SERVICE_PROVIDER: Provider = {
	provide: HTTP_SERVICE_TOKEN,
	useExisting: HttpService,
};
