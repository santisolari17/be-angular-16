import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IResponse } from '@interfaces/response.interface';
import { ErrorHandlerService } from '@services/commons/error-handler.service';
import { Observable, catchError, map } from 'rxjs';
import { HeadersService } from './headers.service';

@Injectable({
	providedIn: 'root',
})
export class HttpHandlerService {
	private _http: HttpClient = inject(HttpClient);
	private _headers: HeadersService = inject(HeadersService);
	private _errorHandlerService: ErrorHandlerService = inject(ErrorHandlerService);

	/**
	 * The function sends a POST request to a specified URL with a given body and returns the response
	 * data, while also handling any errors that occur.
	 * @param {string} stage - The "stage" parameter is a string that represents the stage or environment
	 * in which the request is being made. It could be values like "development", "production", or
	 * "testing".
	 * @param {string} url - The `url` parameter is a string that represents the URL where the HTTP POST
	 * request will be sent to.
	 * @param {unknown} body - The `body` parameter is the data that you want to send in the HTTP request
	 * body. It can be of any type, as indicated by the `unknown` type in the function signature.
	 * @returns The `post` function is returning an Observable of type `IResponse`.
	 */
	post(stage: string, url: string, body: unknown): Observable<IResponse> {
		const headers = this._headers.getDefaultHeaders(stage);
		return this._http.post(url, body, { headers }).pipe(
			map((data: IResponse) => data),
			catchError((error: HttpErrorResponse) => {
				this._errorHandlerService.received(error);
				throw error;
			})
		);
	}

	/**
	 * The `get` function sends an HTTP GET request to the specified URL with the provided headers, maps
	 * the response data to the payload property, and handles any errors that occur.
	 * @param {string} stage - The "stage" parameter is a string that represents the current stage or
	 * environment of the application. It is used to determine the appropriate headers to be sent with the
	 * HTTP request.
	 * @param {string} url - The `url` parameter is a string that represents the URL of the HTTP request
	 * that you want to make. It specifies the location of the resource you want to retrieve or interact
	 * with.
	 * @returns The `get` method is returning an Observable.
	 */
	get(stage: string, url: string): Observable<IResponse> {
		const headers = this._headers.getDefaultHeaders(stage);
		return this._http.get(url, { headers }).pipe(
			map((data: IResponse) => data),
			catchError((error: HttpErrorResponse) => {
				this._errorHandlerService.received(error);
				throw error;
			})
		);
	}
}
