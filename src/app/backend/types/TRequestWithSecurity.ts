import { ThirdKeyResponse } from '@backend/models/ThirdKeyResponse.entity';

export type TRequestWithSecurity<T> = {
	uuid: string;
	terceraClave?: ThirdKeyResponse;
	requestBody: T;
};
