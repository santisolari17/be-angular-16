import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { ParentInteractorModule } from 'beche-utils-lib';

import { routes } from './app.routes';
import { APP_SERVICE_PROVIDERS } from './core/services/service-providers';

export const appConfig: ApplicationConfig = {
	providers: [
		...APP_SERVICE_PROVIDERS,
		importProvidersFrom(BrowserModule, ParentInteractorModule),
		provideRouter(routes),
		provideHttpClient(withInterceptorsFromDi()),
	],
};
