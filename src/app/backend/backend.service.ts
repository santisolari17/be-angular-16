import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { InitialFiltersResponse } from './models/InitialFiltersResponse';
import { BackendResponseOperators } from '@services/backend-response-operators/backend-response-operators';
import { AccountsRequestBody } from './models/AccountsRequestBody';
import { Account } from './models/Account';
import { THttpRequestParams } from 'src/app/interfaces/http-service.interface';

@Injectable({ providedIn: 'root' })
export class BackendService extends BackendResponseOperators {
	public getInitialFilters(): Observable<InitialFiltersResponse> {
		const requestParams: THttpRequestParams = {
			requestLabel: 'getInitialFilters',
			method: 'GET',
			url: `${environment.bffUrl}/${environment.endpoints.getInitialFilters}`,
			funcionalidad: environment.functionalities.getInitialFilters,
			etapa: environment.stage.getInitialFilters,
		};

		return this.execBackendCall(requestParams, InitialFiltersResponse);
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

		return this.execBackendCallArrayResponse<Account>(requestParams, Account);
	}
}
