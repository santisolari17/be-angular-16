import { IsString } from 'class-validator';

export class AccountsRequestBody {
	@IsString()
	tipoConsultaCuentas: string;

	constructor(type: string) {
		this.tipoConsultaCuentas = type;
	}
}
