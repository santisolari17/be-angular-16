import { inject, Injectable } from '@angular/core';
import { SignalsService } from '@services/signals.service';
import { formatRUT } from '@utils/formatRut';
import { formatDate } from '@utils/date';
import { ExcelCabecera, ExcelDocument, ParentInteractorService } from 'beche-utils-lib';
import { getFormattedNumber } from '@utils/formatNumber';

@Injectable({
	providedIn: 'root',
})
export class ExcelService {
	public signals: SignalsService = inject(SignalsService);
	private _parentInteractorService: ParentInteractorService = inject(ParentInteractorService);

	/**
	 * The function creates an Excel document with headers, resume, content headers, and content data, and
	 * then downloads it with a specific filename.
	 */
	async createExcel(): Promise<boolean> {
		try {
			const excelDocument = new ExcelDocument();
			const documentHeaders = this.createDocumentHeaders();
			const documentResume = this.createDocumentResume();
			const { contentHeaders, contentData } = this.createDocumentContent();
			excelDocument.addHojaFormato1('Resumen', documentHeaders, 'Nóminas por Autorizar', documentResume);
			excelDocument.addHojaData('Registros', contentHeaders, contentData, [
				{ column: 1, alignment: 'center', width: 20 },
				{ column: 2, alignment: 'left', width: 70 },
				{ column: 3, alignment: 'center', width: 20 },
				{ column: 4, alignment: 'center', width: 20 },
				{ column: 5, alignment: 'center', width: 20 },
				{ column: 6, alignment: 'right', width: 20 },
				{ column: 7, alignment: 'right', width: 20, numFmt: '$#,##0;[Red]-$#,##0' },
			]);
			excelDocument.download(this.getNameFile('consultaNominas'));
			return true;
		} catch (error) {
			return false;
		}
	}

	/**
	 * The function creates and returns a document header object with various properties.
	 * @returns The function `createDocumentHeaders()` returns an object with the following properties:
	 */
	createDocumentHeaders(): ExcelCabecera {
		const { personaEmpresa, personaNatural, extra } = this._parentInteractorService.getLoginData();
		return {
			nombreEmpresa: extra.razonSocial,
			rutEmpresa: formatRUT(personaEmpresa.rut + personaEmpresa.digito),
			nombreUsuario: extra.nombreUsuario,
			rutUsuario: formatRUT(personaNatural.rut + personaNatural.digito),
			ejecutivo: extra.nombreEjecutivo,
			oficina: extra.oficina,
			telefono: '600 660 0033',
			correo: 'soportei@bancoestado.cl',
		};
	}

	/**
	 * The function `createDocumentResume` returns an array of objects containing information about the
	 * number of records and the total amount.
	 * @returns An array of objects is being returned. Each object has two properties: "nombre" and
	 * "valor". The value of "nombre" is a string representing the name of a data field, and the value of
	 * "valor" is either a string or the result of calling the "getFormattedNumber" function with the
	 * argument '100000'.
	 */
	createDocumentResume(): unknown[] {
		return [
			{ nombre: 'Cantidad de Registros', valor: `1` },
			{ nombre: 'Monto Total', valor: getFormattedNumber('100000') },
		];
	}

	/**
	 * The function "createDocumentContent" returns an object containing headers and data for a document.
	 * @returns The function `createDocumentContent()` is returning an object with two properties:
	 * `contentHeaders` and `contentData`. The value of `contentHeaders` is an array containing the
	 * strings 'Nº Nomina', 'Registros', and 'Monto'. The value of `contentData` is an array containing
	 * the strings '9343535', '1', and '.500.000
	 */
	createDocumentContent(): { contentHeaders: string[]; contentData: string[] } {
		const contentHeaders = ['Nº Nomina', 'Registros', 'Monto'];
		const contentData = ['9343535', '1', '$1.500.000'];
		return { contentHeaders, contentData };
	}

	/**
	 * The function "getNameFile" returns an string containing name for a document.
	 * @returns The function `getNameFile()` returns string
	 */
	private getNameFile(name: string): string {
		const loginData = this._parentInteractorService.getLoginData();
		return `${name}_${loginData.personaEmpresa.rut + loginData.personaEmpresa.digito}_${formatDate('DDMMYYYY')}_${formatDate('HHmm')}`;
	}
}
