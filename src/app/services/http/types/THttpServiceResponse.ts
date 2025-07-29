import { EBackendResponseType } from '../enums/EBackendResponseType';

export type THttpServiceResponse<T> = {
	codigo: number;
	mensaje: string;
	resultado: EBackendResponseType;
	payload: T;
	codigoOperacion: string;
	mensajeNegocio?: string;
};
