import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { InitialFiltersResponse } from '@backend/models';
import { BackendService } from '@backend/service';
import { forkJoin, Observable } from 'rxjs';

export type TAppResolverData = {
	initialFilters: InitialFiltersResponse;
};

export const AppResolver: ResolveFn<TAppResolverData> = (): Observable<TAppResolverData> => {
	const _backendService = inject(BackendService);
	return forkJoin({ initialFilters: _backendService.getInitialFilters() });
};
