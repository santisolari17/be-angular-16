import { Routes } from '@angular/router';
import { AppResolver } from './app.resolver';
import { APPLICATION_BASE_URL } from '@utils/constants';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: `/${APPLICATION_BASE_URL}` },
	{
		path: APPLICATION_BASE_URL,
		resolve: { indexPageResolver: AppResolver },
		loadComponent: () => import('./pages/index-page/index-page.component').then(comp => comp.IndexPageComponent),
	},
];
