import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GenerateDocsComponent } from '@components/generate-docs/generate-docs.component';
import { ModalErrorComponent } from '@components/modal-error/modal-error.component';
import { AsdHeadtitleComponent } from 'asd';
import { ParentInteractorService } from 'beche-utils-lib';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'be-root',
	standalone: true,
	imports: [RouterOutlet, ModalErrorComponent, GenerateDocsComponent, AsdHeadtitleComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	public title: string = '072025-angular-16';
	private _parentInteractorService: ParentInteractorService = inject(ParentInteractorService);

	ngOnInit(): void {
		this._parentInteractorService.setEnvironment(environment);
		if (environment.production) {
			this._parentInteractorService.startRefreshing();
			this._parentInteractorService.startMonitorInstana().subscribe();
		}
	}
}
