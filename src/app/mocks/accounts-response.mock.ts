import { faker } from '@faker-js/faker';
import { StubbyData } from 'stubby';

import { TAccountsBackendPayload } from '@backend/models';
import { BFF_VERSION_PREFIX, ENDPOINTS } from '@utils/constants';
import { EBackendResponseType, THttpServiceResponse } from '@core/interfaces';

const MOCKS_QUANTITY = 100;

function generateMocks(count: number): TAccountsBackendPayload[] {
	return Array.from({ length: count }, () => ({
		idCuenta: faker.string.uuid(),
		duenoCuenta: faker.person.fullName(),
		nombreCuenta: faker.finance.accountName(),
		numeroCuenta: faker.finance.accountNumber(10),
		tarjetaCredito: faker.finance.creditCardIssuer(),
		moneda: faker.helpers.arrayElement(['CLP', 'USD']),
		saldo: Number(faker.finance.amount({ min: 1000, max: 10000, dec: 2 })),
		ultimaTransaccion: faker.date.recent().toISOString(),
	}));
}

const ACCOUNTS_RESPONSE_FIXED_MOCKS: TAccountsBackendPayload[] = [
	{
		idCuenta: faker.string.uuid(),
		duenoCuenta: 'James Marcus',
		nombreCuenta: 'Umbrella TF Account',
		numeroCuenta: '0098766122',
		tarjetaCredito: 'mastercard',
		moneda: 'CLP',
		saldo: 10000,
		ultimaTransaccion: '2025-03-31T06:12:24.677Z',
	},
];

const ACCOUNTS_MOCKS: TAccountsBackendPayload[] = [...ACCOUNTS_RESPONSE_FIXED_MOCKS, ...generateMocks(MOCKS_QUANTITY)];

const ACCOUNTS_RESPONSE_MOCK: THttpServiceResponse<TAccountsBackendPayload[]> = {
	codigo: 200,
	mensaje: '[MOCKS] Filtros Obtenidos correctamente',
	resultado: EBackendResponseType.Success,
	codigoOperacion: 'AA.BB.CC',
	mensajeNegocio: '',
	payload: ACCOUNTS_MOCKS,
};

export const ACCOUNTS_ENDPOINT_STUB: StubbyData = {
	request: {
		url: `^${BFF_VERSION_PREFIX}/${ENDPOINTS.testCall}$`,
		method: 'POST',
	},
	response: {
		status: 200,
		latency: 800,
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(ACCOUNTS_RESPONSE_MOCK),
	},
};
