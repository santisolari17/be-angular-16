import { Component, inject } from '@angular/core';
import { ErrorHandlerService } from '@services/commons/error-handler.service';
import { AsdModalAlertComponent } from 'asd';

@Component({
	selector: 'be-modal-error',
	standalone: true,
	imports: [AsdModalAlertComponent],
	templateUrl: './modal-error.component.html',
	styles: [],
})
export class ModalErrorComponent {
	public errorHandler: ErrorHandlerService = inject(ErrorHandlerService);
}
