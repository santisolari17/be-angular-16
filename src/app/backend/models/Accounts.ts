import { IsDateString, IsNumber, IsString } from 'class-validator';

export type TAccountsBackendPayload = {
	duenoCuenta: string;
	nombreCuenta: string;
	numeroCuenta: string;
	tarjetaCredito: string;
	saldo: number;
	ultimaTransaccion: string;
};

export class Accounts {
	@IsString()
	public accountOwner: string;

	@IsString()
	public accountName: string;

	@IsString()
	public accountNumber: string;

	@IsString()
	public creditCardIssuer: string;

	@IsNumber()
	public balance: number;

	@IsDateString()
	public lastTransactionDate: Date;

	constructor(payload: TAccountsBackendPayload) {
		this.accountOwner = payload.duenoCuenta;
		this.accountName = payload.nombreCuenta;
		this.accountNumber = payload.numeroCuenta;
		this.creditCardIssuer = payload.tarjetaCredito;
		this.balance = payload.saldo;
		this.lastTransactionDate = new Date(payload.ultimaTransaccion);
	}
}
