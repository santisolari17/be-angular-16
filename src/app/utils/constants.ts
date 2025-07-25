import { environment } from '@env/environment';
import { Endpoints } from '@interfaces/endpoints.interface';

const APPLICATION = 'ConsultarNominas';
const FUNCIONALITY = 'SVXPMN020';
const URL_CONS_NOMINAPJ_BFF = '/bff/v1/consu-nominapj-mn-bff';
const ENDPOINTS: Endpoints = {
	getFilters: `${environment.bffUrl}${URL_CONS_NOMINAPJ_BFF}/mtn/filtro-consulta`,
};

export { APPLICATION, ENDPOINTS, FUNCIONALITY };
