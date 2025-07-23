import { Injectable, inject } from '@angular/core';
import { FiltersResponse, IResponse } from '@interfaces/response.interface';
import { HttpHandlerService } from '@services/commons/http-handler.service';
import { ENDPOINTS } from '@utils/constants';
import { Observable, map } from 'rxjs';

@Injectable()
export class ExampleBffService {
	private _httpHandlerService: HttpHandlerService = inject(HttpHandlerService);
	/**
	 * The function `getFilters` sends a POST request to the `getFiltersUrl` endpoint and returns an
	 * Observable of type `FiltersResponse`.
	 * @returns The method is returning an Observable of type FiltersResponse.
	 */
	public getFilters(): Observable<FiltersResponse> {
		return this._httpHandlerService.post('filtros', ENDPOINTS.getFilters, null).pipe(map((data: IResponse) => data.payload as FiltersResponse));
	}
}
