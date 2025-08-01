import { IsDate, IsNumber, IsString, IsUUID } from 'class-validator';

export type TAccountsBackendPayload = {
	idCuenta: string;
	duenoCuenta: string;
	nombreCuenta: string;
	numeroCuenta: string;
	tarjetaCredito: string;
	moneda: string;
	saldo: number;
	ultimaTransaccion: string;
};

export class Account {
	@IsUUID()
	public id: string;

	@IsString()
	public accountOwner: string;

	@IsString()
	public accountName: string;

	@IsString()
	public accountNumber: string;

	@IsString()
	public creditCardIssuer: string;

	@IsString()
	public currency: string;

	@IsNumber()
	public balance: number;

	@IsDate()
	public lastTransactionDate: Date;

	constructor(payload: TAccountsBackendPayload) {
		this.id = payload.idCuenta;
		this.accountOwner = payload.duenoCuenta;
		this.accountName = payload.nombreCuenta;
		this.accountNumber = payload.numeroCuenta;
		this.creditCardIssuer = payload.tarjetaCredito;
		this.currency = payload.moneda;
		this.balance = payload.saldo;
		this.lastTransactionDate = new Date(payload.ultimaTransaccion);
	}
}
