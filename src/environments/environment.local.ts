import { APPLICATION_URL, BFF_VERSION_PREFIX, ENDPOINTS, FUNCTIONALITIES, LOCAL_HOST, SECURITY_MODULE_URL, STAGES } from '@utils/constants';

export const environment = {
	production: false,
	bffUrl: `${LOCAL_HOST}${BFF_VERSION_PREFIX}`,
	appUrl: `${LOCAL_HOST}${APPLICATION_URL}`,
	hostRsaService: 'https://desa-appempresas.bancoestado.cl',
	securityModuleUrl: `http://localhost:3001${SECURITY_MODULE_URL}`,
	endpoints: ENDPOINTS,
	functionalities: FUNCTIONALITIES,
	stage: STAGES,
};
