import { APPLICATION_URL, BFF_VERSION_PREFIX, ENDPOINTS, FUNCTIONALITIES, STAGES } from '@utils/constants';

export const environment = {
	production: true,
	bffUrl: `${location.origin}${BFF_VERSION_PREFIX}`,
	appUrl: `${location.origin}${APPLICATION_URL}`,
	hostRsaService: `${location.origin}`,
	endpoints: ENDPOINTS,
	functionalities: FUNCTIONALITIES,
	stage: STAGES,
};
