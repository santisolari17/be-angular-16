import { inject, Injectable } from '@angular/core';
import { SignalsService } from '@services/signals.service';
import { formatDate } from '@utils/date';
import { formatRUT } from '@utils/formatRut';
import { IHtmlElementCanvas, ParentInteractorService, PdfDocumentMovimientos } from 'beche-utils-lib';

@Injectable({
	providedIn: 'root',
})
export class PdfService {
	public signals: SignalsService = inject(SignalsService);
	private _parentInteractorService: ParentInteractorService = inject(ParentInteractorService);

	async createPdf(): Promise<boolean> {
		try {
			const pdfDocument = new PdfDocumentMovimientos();
			const { personaEmpresa, personaNatural, extra } = this._parentInteractorService.getLoginData();
			const todaysDate = formatDate('DD-MM-YYYY');
			const todaysTime = formatDate('HH:mm');
			pdfDocument.configureHeader(
				formatRUT(personaEmpresa.rut + personaEmpresa.digito),
				extra.nombreDeFantasia,
				formatRUT(personaNatural.rut + personaNatural.digito),
				extra.nombreUsuario,
				extra.nombreEjecutivo,
				extra.oficina,
				todaysDate,
				todaysTime
			);
			pdfDocument.addTitle('Cartola');

			const element = document.getElementById('card');
			if (element) {
				await pdfDocument.addHtmlElement({ contenido: element, arrayHtmlElementRemove: [] } as IHtmlElementCanvas);
			}
			pdfDocument.open();
			return true;
		} catch (error) {
			return false;
		}
	}
}
