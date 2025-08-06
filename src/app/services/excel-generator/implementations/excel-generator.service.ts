import { Injectable } from '@angular/core';
import { ExcelCabecera, ExcelDocument, LoginData, ParentInteractorService } from 'beche-utils-lib';
import { environment } from '@env/environment';
import { IExcelGenerator, TCorpotateHeaderDataBlock, TMakeExcelFileParams, TServiceHeaderData } from 'src/app/interfaces/_index_';
import { HeaderLengthNotSameAsRowsError } from '../errors/HeaderLengthNotSameAsRows.error';
import { RowsNotSameLengthError } from '../errors/RowsNotSameLength.error';

@Injectable({
	providedIn: 'root',
})
export class ExcelGeneratorService implements IExcelGenerator {
	private _mockLoginData = !environment.production;
	private _driver = new ExcelDocument();
	private _corporateHeader: ExcelCabecera;

	constructor(private parentInteractorService: ParentInteractorService) {
		const loginData = this._getLoginData(this._mockLoginData);

		this._corporateHeader = {
			nombreEmpresa: loginData.extra.razonSocial,
			rutEmpresa: this._formatRut(loginData.personaEmpresa.rut, loginData.personaEmpresa.digito),
			nombreUsuario: loginData.extra.nombreUsuario,
			rutUsuario: this._formatRut(loginData.personaNatural.rut, loginData.personaNatural.digito),
			ejecutivo: loginData.extra.nombreEjecutivo,
			oficina: loginData.extra.oficina,
			telefono: '600 660 0033',
			correo: 'soportei@bancoestado.cl',
		};
	}

	public makeExcelFile(fileParams: TMakeExcelFileParams): void {
		this._checkDataHeadersAndRowsCorrelation(fileParams);

		this._driver.addHojaFormato1Multi(
			fileParams.corporateHeaderSheetName,
			this._corporateHeader,
			this._getCoporateHeaderDataBlock(fileParams.corpotateHeaderSheetDataBlock)
		);

		this._driver.addHojaData(fileParams.dataSheetName, fileParams.dataSheetHeaders, fileParams.dataSheetRows);

		this._driver.download(this._getFilename(fileParams));

		this._resetDriverInstance();
	}

	private _getCoporateHeaderDataBlock(data: TCorpotateHeaderDataBlock[]): TServiceHeaderData[] {
		return data.map(block => ({
			subTitulo: block.subtitle,
			tableBody: block.dataRows.map(row => ({ nombre: row.rowTitle, valor: row.rowValue })),
		}));
	}

	private _getFilename(fileParams: TMakeExcelFileParams): string {
		const rutString = fileParams.addHeaderUserRutToFilename ? this._getUserHeaderRutString(this._corporateHeader) : '';
		const dateString = fileParams.addDateStringToFilename ? this._getDateString() : '';
		return fileParams.filename + rutString + dateString;
	}

	private _getUserHeaderRutString(fileHeader: ExcelCabecera): string {
		return `_${fileHeader.rutUsuario.replace(/[^0-9Kk]/g, '')}`;
	}

	private _getDateString(): string {
		const date = new Date();

		const year = date.getFullYear().toString().padStart(4, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		const seconds = date.getSeconds().toString().padStart(2, '0');

		return '_' + year + month + day + hours + minutes + seconds;
	}

	public setMockLoginData(value: boolean): void {
		this._mockLoginData = value;
	}

	private _checkDataHeadersAndRowsCorrelation(fileParams: TMakeExcelFileParams): void {
		let lastRowLength: number;

		for (const [index, dataRow] of fileParams.dataSheetRows.entries()) {
			if (index > 0) {
				if (dataRow.length !== lastRowLength) {
					throw RowsNotSameLengthError();
				}
			}

			lastRowLength = dataRow.length;
		}

		if (lastRowLength !== fileParams.dataSheetHeaders.length) {
			throw HeaderLengthNotSameAsRowsError();
		}
	}

	private _resetDriverInstance(): void {
		this._driver = new ExcelDocument();
	}

	private _formatRut(number: string, dv: string): string {
		const formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
		return `${formattedNumber}-${dv.toUpperCase()}`;
	}

	private _getLoginData(mock = false): LoginData {
		if (mock) {
			return {
				personaNatural: {
					rut: '12241017',
					digito: 'K',
				},
				personaEmpresa: {
					rut: '60805000',
					digito: '0',
				},
				rut: '12241017',
				digitoVerificador: 'K',
				idSesion: 'fb9b2461-ee52-4fec-8516-e1df4aaf14e9',
				extra: {
					nombreUsuario: 'CLIENTE DE PRUEBA CHRIS',
					razonSocial: 'ZXOSX',
					nombreDeFantasia: 'UMBRELLA CORP',
					nombreEjecutivo: 'ALBERT WESKER',
					emailEjecutivo: 'AWESKER',
					codOficina: '1',
					oficina: 'STGO. PRINCIPAL',
				},
				iat: 1732126975,
				exp: 2732134175,
				canal: 'NWE',
				token:
					'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SndaWEp6YjI1aFRtRjBkWEpoYkNJNmV5SnlkWFFpT2lJeE1qSTBNVEF4TnlJc0ltUnBaMmwwYnlJNklrc2lmU3dpY0dWeWMyOXVZVVZ0Y0hKbGMyRWlPbnNpY25WMElqb2lOakE0TURVd01EQWlMQ0prYVdkcGRHOGlPaUl3SW4wc0luSjFkQ0k2SWpFeU1qUXhNREUzSWl3aVpHbG5hWFJ2Vm1WeWFXWnBZMkZrYjNJaU9pSkxJaXdpYVdSVFpYTnBiMjRpT2lKbVlqbGlNalEyTVMxbFpUVXlMVFJtWldNdE9EVXhOaTFsTVdSbU5HRmhaakUwWlRraUxDSmxlSFJ5WVNJNmV5SnViMjFpY21WVmMzVmhjbWx2SWpvaVEweEpSVTVVUlNCRVJTQlFVbFZGUWtFZ1JsSkJUa05KVTBOUElpd2ljbUY2YjI1VGIyTnBZV3dpT2lKYVdFOVRXQ0lzSW01dmJXSnlaVVJsUm1GdWRHRnphV0VpT2lKVVJWTlBVa1ZTU1VFZ1IxSkJUQ0JFUlNCTVFTQlNSVkJWUWt4SlEwRWlMQ0p1YjIxaWNtVkZhbVZqZFhScGRtOGlPaUpXU1VSQlRDQlNUMFJTU1VkVlJWb2lMQ0psYldGcGJFVnFaV04xZEdsMmJ5STZJa05XU1VSQlRDSXNJbU52WkU5bWFXTnBibUVpT2pFc0ltOW1hV05wYm1FaU9pSlRWRWRQTGlCUVVrbE9RMGxRUVV3aWZTd2lhV0YwSWpveE56TXlNVEkyT1RjMUxDSmxlSEFpT2pJM016SXhNelF4TnpVc0ltTmhibUZzSWpvaVRsZEZJbjAub0FJTVBVU3lLbmdpaE5HUXgtMC1VSlRSLXE4SGxJV1I2Sk5tS0tYUnNGbw==',
			};
		}

		return this.parentInteractorService.getLoginData();
	}
}
