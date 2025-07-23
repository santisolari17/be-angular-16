import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APPLICATION, FUNCIONALITY } from '@utils/constants';

@Injectable({
	providedIn: 'root',
})
export class HeadersService {
	/**
	 * The function returns a HttpHeaders object with default headers for a given stage.
	 * @param {string} stage - The stage parameter is a string that represents the current stage or
	 * environment of the application. It could be values like "development", "staging", or "production".
	 * @returns an instance of the HttpHeaders class with the specified headers.
	 */
	getDefaultHeaders(stage: string): HttpHeaders {
		const headers = new HttpHeaders({
			funcionalidad: FUNCIONALITY,
			'config-loader': 'true',
			nombreAplicacion: APPLICATION,
			etapa: stage,
		});

		return headers;
	}
}
