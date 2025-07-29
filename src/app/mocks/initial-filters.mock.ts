import { EBackendResponseType } from '@services/http/enums/EBackendResponseType';
import { THttpServiceResponse } from '@services/http/types/THttpServiceResponse';
import { BFF_VERSION_PREFIX, ENDPOINTS } from '@utils/constants';
import { TInitialFiltersBackendPayload } from 'src/app/backend/models/InitialFiltersResponse.entity';
import { StubbyData } from 'stubby';

const INITIAL_FILTERS_BACKEND_PAYLOAD_MOCK: TInitialFiltersBackendPayload = {
	tieneAcceso: false,
	fechaUltimaActualizacion: '12/10/2024',
	listaOpciones: [
		{
			idOpcion: 1,
			descripcion: 'Opcion 1',
		},
		{
			idOpcion: 2,
			descripcion: 'Opcion 2',
		},
		{
			idOpcion: 3,
			descripcion: 'Opcion 3',
		},
	],
};

const INITIAL_FILTERS_RESPONSE_MOCK: THttpServiceResponse<TInitialFiltersBackendPayload> = {
	codigo: 200,
	mensaje: '[MOCKS] Filtros Obtenidos correctamente',
	resultado: EBackendResponseType.Success,
	codigoOperacion: 'AA.BB.CC',
	mensajeNegocio: '',
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
