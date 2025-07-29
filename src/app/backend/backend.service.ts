import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';
import { InitialFiltersResponse } from './models/InitialFiltersResponse.entity';
import { BackendResponseOperators } from '@services/backend-response-operators/backend-response-operators';
import { EHttpMethod } from '@services/http/enums/EHttpMethod';
import { THttpRequestParams } from '@services/http/types/THttpRequestParams';

@Injectable({ providedIn: 'root' })
export class BackendService extends BackendResponseOperators {
	public getInitialFilters(): Observable<InitialFiltersResponse> {
		const requestParams: THttpRequestParams = {
			requestLabel: 'getInitialFilters',
			method: EHttpMethod.GET,
			url: `${environment.bffUrl}/${environment.endpoints.getInitialFilters}`,
			funcionalidad: environment.functionalities.getInitialFilters,
			etapa: environment.stage.getInitialFilters,
		};

		return this.execBackendCall(requestParams, InitialFiltersResponse);
	}
}
