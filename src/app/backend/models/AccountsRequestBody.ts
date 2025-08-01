import { IsInt } from 'class-validator';

export class AccountsRequestBody {
	@IsInt()
	tipoConsultaCuentas: number;

	constructor(type: number) {
		this.tipoConsultaCuentas = type;
	}
}
