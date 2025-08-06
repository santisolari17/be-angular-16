import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { InitialFiltersResponse } from './models/InitialFiltersResponse';
import { AccountsRequestBody } from './models/AccountsRequestBody';
import { Account } from './models/Account';
import { IBackendResponseOperators, THttpRequestParams } from 'src/app/interfaces/_index_';
import { BACKEND_RESPONSE_OPERATORS_SERVICE_TOKEN } from '@services/service-tokens';

@Injectable({ providedIn: 'root' })
export class BackendService {
	private _backendResponseOperators = inject<IBackendResponseOperators>(BACKEND_RESPONSE_OPERATORS_SERVICE_TOKEN);

	public getInitialFilters(): Observable<InitialFiltersResponse> {
		const requestParams: THttpRequestParams = {
			requestLabel: 'getInitialFilters',
			method: 'GET',
			url: `${environment.bffUrl}/${environment.endpoints.getInitialFilters}`,
			funcionalidad: environment.functionalities.getInitialFilters,
			etapa: environment.stage.getInitialFilters,
		};

		return this._backendResponseOperators.execBackendCall(requestParams, InitialFiltersResponse);
	}

	public getAccounts(body: AccountsRequestBody): Observable<Account[]> {
		const requestParams: THttpRequestParams = {
			requestLabel: 'getAccounts',
			method: 'POST',
			url: `${environment.bffUrl}/${environment.endpoints.testCall}`,
			funcionalidad: environment.functionalities.testCall,
			etapa: environment.stage.testCall,
			body,
		};

		return this._backendResponseOperators.execBackendCallArrayResponse<Account>(requestParams, Account);
	}
}
