import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export type TThirdKeyBackendPayload = {
	estado: string;
	terceraClave: {
		email: string;
		tiempoEspera: number;
		glosaError: string;
	};
};

export class ThirdKeyResponse {
	@IsEmail()
	public email: string;

	@IsInt()
	public timerValueInSeconds: number;

	@IsOptional()
	@IsString()
	public errorMessage?: string;

	constructor(payload: TThirdKeyBackendPayload) {
		this.email = payload.terceraClave.email;
		this.timerValueInSeconds = payload.terceraClave.tiempoEspera;
		this.errorMessage = payload.terceraClave.glosaError;
	}
}
