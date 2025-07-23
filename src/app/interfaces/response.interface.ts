import { IPayroll } from './payroll.interface';
import { IState } from './state.interface';

export interface IResponse<T = FiltersResponse | PayrollResponse> {
	codigo: number;
	mensaje?: string;
	mensajeNegocio?: string;
	result?: string;
	payload: T;
	operationCode?: string;
}

export interface FiltersResponse {
	estados: IState[];
}

export interface PayrollResponse {
	nominas: IPayroll[];
}

export interface IErrorResponse {
	error: Error;
}

export interface IError {
	codigo: number;
	mensaje: string;
	mensajeNegocio: string;
	resultado: string;
	payload?: unknown;
}
