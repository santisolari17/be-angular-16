import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ParentInteractorModule } from 'beche-utils-lib';
import { routes } from './app.routes';
import { HTTP_SERVICE_PROVIDER } from '@services/http/http-service.provider';

export const appConfig: ApplicationConfig = {
	providers: [
		HTTP_SERVICE_PROVIDER,
		importProvidersFrom(BrowserModule, ParentInteractorModule),
		provideRouter(routes),
		provideHttpClient(withInterceptorsFromDi()),
	],
};
