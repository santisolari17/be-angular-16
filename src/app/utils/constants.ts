type TAppServiceAPI = {
	getInitialFilters: string;
	securityModule: string;
	testCall: string;
};

export const APPLICATION_BASE_URL = 'my-example-app';
export const APPLICATION_NAME = 'my-example-app';
export const BFF_VERSION_PREFIX = '/bff/v1/my-example-app-bff';
export const STUBBY_SERVER_PORT = 3000;

export const DESA_HOST = 'https://desa-appempresas.bancoestado.cl';
export const LOCAL_HOST = `http://localhost:${STUBBY_SERVER_PORT}`;
export const APPLICATION_URL = `/apps/${APPLICATION_NAME}/`;
export const BFF_URL = `${BFF_VERSION_PREFIX}/`;
export const SECURITY_MODULE_URL = `/apps/modulo-desafio-web`;

// Functionalities
export const MOCK_FUNCTIONALITY_1 = 'SVXAAA001';

export const ENDPOINTS: TAppServiceAPI = {
	getInitialFilters: 'obtenerFiltros',
	testCall: 'consultaDePrueba',
	securityModule: '',
};

export const FUNCTIONALITIES: TAppServiceAPI = {
	getInitialFilters: MOCK_FUNCTIONALITY_1,
	testCall: MOCK_FUNCTIONALITY_1,
	securityModule: '',
};

export const STAGES: TAppServiceAPI = {
	getInitialFilters: 'AAAXXX',
	testCall: 'BBBXXX',
	securityModule: '',
};
