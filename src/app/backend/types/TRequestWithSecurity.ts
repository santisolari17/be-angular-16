import { ThirdKeyResponse } from '../models/ThirdKeyResponse';

export type TRequestWithSecurity<T> = {
	uuid: string;
	terceraClave?: ThirdKeyResponse;
	requestBody: T;
};
