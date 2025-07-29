import { BFF_VERSION_PREFIX, DESA_HOST, ENDPOINTS, FUNCTIONALITIES, STAGES } from '@utils/constants';

export const environment = {
	production: false,
	mockEnvironment: true,
	bffUrl: `${DESA_HOST}${BFF_VERSION_PREFIX}`,
	hostRsaService: 'https://desa-appempresas.bancoestado.cl',
	securityModuleUrl: 'http://localhost:4201',
	endpoints: ENDPOINTS,
	functionalities: FUNCTIONALITIES,
	stage: STAGES,
};
