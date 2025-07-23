import { Routes } from '@angular/router';
import { ExampleBffService } from './services/example-bff.service';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: '/ejemplo-app' },
	{
		path: 'ejemplo-app',
		loadComponent: () => import('./pages/search-page/search-page.component').then(comp => comp.SearchPageComponent),
		providers: [ExampleBffService],
	},
];
