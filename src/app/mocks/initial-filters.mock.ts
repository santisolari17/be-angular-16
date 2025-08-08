import { StubbyData } from 'stubby';
import { BFF_VERSION_PREFIX, ENDPOINTS } from '@utils/constants';
import { TInitialFiltersBackendPayload } from '@backend/models';
import { EBackendResponseType, THttpServiceResponse } from '@core/interfaces';

const INITIAL_FILTERS_BACKEND_PAYLOAD_MOCK: TInitialFiltersBackendPayload = {
	tieneAcceso: false,
	fechaUltimaActualizacion: '12/10/2024',
	listaOpciones: [
		{
			idOpcion: 1,
			descripcion: 'Cuentas Tipo A',
		},
		{
			idOpcion: 2,
			descripcion: 'Cuentas Tipo B',
		},
		{
			idOpcion: 3,
			descripcion: 'Cuentas Tipo C',
		},
	],
};

const INITIAL_FILTERS_RESPONSE_MOCK: THttpServiceResponse<TInitialFiltersBackendPayload> = {
	codigo: 200,
	mensaje: '[MOCKS] Filtros Obtenidos correctamente',
	resultado: EBackendResponseType.Success,
	codigoOperacion: 'AA.BB.CC',
	mensajeNegocio: 'HOLA MUNDO',
	payload: INITIAL_FILTERS_BACKEND_PAYLOAD_MOCK,
};

export const INITIAL_FILTERS_ENDPOINT_STUB: StubbyData = {
	request: {
		url: `^${BFF_VERSION_PREFIX}/${ENDPOINTS.getInitialFilters}$`,
		method: 'GET',
	},
	response: {
		status: 200,
		latency: 800,
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(INITIAL_FILTERS_RESPONSE_MOCK),
	},
};
