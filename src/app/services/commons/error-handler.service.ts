import { Injectable } from '@angular/core';
import { IDataError } from '@interfaces/dataError.interface';

@Injectable({
	providedIn: 'root',
})
export class ErrorHandlerService {
	modalErrorTecnico: boolean = false;
	modalErrorNegocio: boolean = false;
	tituloError: string = 'Error';
	mensajeNegocio: string =
		'No se pudo completar su requerimiento. Por favor intente más tarde.<br> Si el problema persiste, por favor contactar a <br>Soporte Internet 600 660 0033.';
	codigoOperacion: string = '';

	modalData: IDataError = {
		titulo: this.tituloError,
		mensaje: this.mensajeNegocio,
		codigo: this.codigoOperacion,
	};

	/**
	 * The function "received" handles errors and displays appropriate error messages based on the error
	 * type and result.
	 * @param {any} err - The parameter `err` is of type `any`, which means it can be any data type. In
	 * this code, it is expected to be an error object.
	 */
	public received(err: unknown): void {
		try {
			if (err instanceof Error) {
				const data = JSON.parse(err.message);
				const { error: { mensajeNegocio = this.mensajeNegocio, resultado = '', codigoOperacion = 'Error Genérico' } = {} } = data;

				if (resultado === 'N') {
					this.modalData.mensaje = mensajeNegocio;
					this.modalData.codigo = '';

					this.modalErrorNegocio = !this.modalErrorNegocio;
				} else {
					this.modalData.mensaje = resultado === 'T' ? mensajeNegocio : this.mensajeNegocio;
					this.modalData.codigo = resultado === 'T' ? codigoOperacion : this.codigoOperacion;

					this.modalErrorTecnico = !this.modalErrorTecnico;
				}
			} else {
				// Error no identificado
				this.modalData.mensaje = this.mensajeNegocio;
				this.modalData.codigo = 'ERR/A';

				this.modalErrorTecnico = !this.modalErrorTecnico;
			}
		} catch (error) {
			this.modalData.mensaje = this.mensajeNegocio;
			this.modalData.codigo = 'ERR/B';
			this.modalErrorTecnico = !this.modalErrorTecnico;
		}
	}
}
