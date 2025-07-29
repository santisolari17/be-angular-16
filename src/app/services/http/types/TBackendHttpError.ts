/* eslint-disable @typescript-eslint/no-explicit-any */
import { THttpServiceResponse } from './THttpServiceResponse';

export type TBackendHttpErrorResponse = {
	error: THttpServiceResponse<any>;
	message: string;
	name: string;
	status: number;
	statusText: string;
	url: string;
	ok: boolean;
};
