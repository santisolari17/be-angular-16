import { IsBoolean, IsDateString, ValidateNested } from 'class-validator';
import { OptionList, TOptionListBackendPayload } from './OptionList';

export type TInitialFiltersBackendPayload = {
	tieneAcceso: boolean;
	fechaUltimaActualizacion: string;
	listaOpciones: TOptionListBackendPayload[];
};

export class InitialFiltersResponse {
	@IsBoolean()
	public hasAccess: boolean;

	@IsDateString()
	public lastUpdate: Date;

	@ValidateNested({ each: true })
	public optionList: OptionList[];

	constructor(payload: TInitialFiltersBackendPayload) {
		this.hasAccess = payload.tieneAcceso;
		this.lastUpdate = new Date();
		this.optionList = payload.listaOpciones.map(option => new OptionList(option));
	}
}
