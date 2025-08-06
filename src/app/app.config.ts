import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ParentInteractorModule } from 'beche-utils-lib';
import { routes } from './app.routes';
import { APP_SERVICE_PROVIDERS } from './services/service-providers';

export const appConfig: ApplicationConfig = {
	providers: [
		...APP_SERVICE_PROVIDERS,
		importProvidersFrom(BrowserModule, ParentInteractorModule),
		provideRouter(routes),
		provideHttpClient(withInterceptorsFromDi()),
	],
};
