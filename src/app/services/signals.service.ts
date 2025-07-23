import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class SignalsService {
	exportBtn = signal<boolean>(false);

	/**
	 * The function sets the value of the exportBtn variable.
	 * @param {boolean} value - The value parameter is a boolean value that determines whether the "Excel"
	 * button should be shown or hidden.
	 */
	showExportBtn(value: boolean): void {
		this.exportBtn.set(value);
	}
}
