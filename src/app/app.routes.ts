import { Routes } from '@angular/router';
import { ExampleBffService } from './services/example-bff.service';
import { AppResolver } from './app.resolver';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: '/ejemplo-app' },
	{
		path: 'ejemplo-app',
		resolve: { indexPageResolver: AppResolver },
		loadComponent: () => import('./pages/search-page/search-page.component').then(comp => comp.SearchPageComponent),
		providers: [ExampleBffService],
	},
];
