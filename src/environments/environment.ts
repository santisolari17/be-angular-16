import { BFF_VERSION_PREFIX, DESA_HOST, ENDPOINTS, FUNCTIONALITIES, SECURITY_MODULE_URL, STAGES } from '@utils/constants';

export const environment = {
	production: false,
	bffUrl: `${DESA_HOST}${BFF_VERSION_PREFIX}`,
	hostRsaService: 'https://desa-appempresas.bancoestado.cl',
	securityModuleUrl: `http://localhost:3001${SECURITY_MODULE_URL}`,
	endpoints: ENDPOINTS,
	functionalities: FUNCTIONALITIES,
	stage: STAGES,
};
