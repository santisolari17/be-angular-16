import { IsInt, IsString } from 'class-validator';

export type TOptionListBackendPayload = {
	idOpcion: number;
	descripcion: string;
};

export class OptionList {
	@IsInt()
	public id: number;

	@IsString()
	public description: string;

	constructor(payload: TOptionListBackendPayload) {
		this.id = payload.idOpcion;
		this.description = payload.descripcion;
	}
}
