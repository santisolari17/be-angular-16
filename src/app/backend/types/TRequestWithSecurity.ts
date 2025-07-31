import { ThirdKeyResponse } from '@backend/models/ThirdKeyResponse';

export type TRequestWithSecurity<T> = {
	uuid: string;
	terceraClave?: ThirdKeyResponse;
	requestBody: T;
};
