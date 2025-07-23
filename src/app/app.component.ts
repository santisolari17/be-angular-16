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
		} else
			sessionStorage.setItem(
				'token',
				'ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SndaWEp6YjI1aFJXMXdjbVZ6WVNJNmV5SnlkWFFpT2lJMk1ERXdNVEF3TUNJc0ltUnBaMmwwYnlJNklqTWlmU3dpY0dWeWMyOXVZVTVoZEhWeVlXd2lPbnNpY25WMElqb2lPRE00TXpBMk1TSXNJbVJwWjJsMGJ5STZJakVpZlN3aWFXUlRaWE5wYjI0aU9pSjBaWE4wSWl3aWFXRjBJam94TmpreU9EZzFOakkxTENKbGVIQWlPakUzT0RjMU9EQXdNalVzSW1OaGJtRnNJam9pZEdWemRDSXNJbkoxZENJNklqZ3pPRE13TmpFaUxDSmthV2RwZEc5V1pYSnBabWxqWVdSdmNpSTZJakVpTENKbGVIUnlZU0k2ZXlKdWIyMWljbVZWYzNWaGNtbHZJam9pVlZOVlFWSkpUeUJDVWtsVVR5SXNJbkpoZW05dVUyOWphV0ZzSWpvaVUwVk9WRkpCSUVsT1ZrVlNVMGxQVGtWVElGa2dVMFZTVmtsRFNVOVRJRXhKVFVsVVFVUkJJaXdpYm05dFluSmxSR1ZHWVc1MFlYTnBZU0k2SWxORlRsUlNRU0JKVGxaRlVsTkpUMDVGVXlCTVZFUkJJaXdpYm05dFluSmxSV3BsWTNWMGFYWnZJam9pVmtsTVRFRkNSVmxVU1VFZ1VrVlpSVk1pTENKbGJXRnBiRVZxWldOMWRHbDJieUk2SWxKV1NVeE1RVUpGSWl3aVkyOWtUMlpwWTJsdVlTSTZNU3dpYjJacFkybHVZU0k2SWxOVVIwOHVJRkJTU1U1RFNWQkJUQ0o5ZlEudDhmY19zRDhYZW95Q0xMUUFYSld3aGFWX3pUSzFWMXZoZ1dWV3NPTEVYWQ=='
			);
	}
}
