import { BFF_VERSION_PREFIX, ENDPOINTS, FUNCTIONALITIES, LOCAL_HOST, STAGES } from '@utils/constants';

export const environment = {
	production: false,
	bffUrl: `${LOCAL_HOST}${BFF_VERSION_PREFIX}`,
	hostRsaService: 'https://desa-appempresas.bancoestado.cl',
	endpoints: ENDPOINTS,
	functionalities: FUNCTIONALITIES,
	stage: STAGES,
};
