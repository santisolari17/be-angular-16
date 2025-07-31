import { faker } from '@faker-js/faker';
import { TAccountsBackendPayload } from '@backend/models/Accounts';
import { THttpServiceResponse } from '@services/http/types/THttpServiceResponse';
import { EBackendResponseType } from '@services/http/enums/EBackendResponseType';
import { StubbyData } from 'stubby';
import { BFF_VERSION_PREFIX, ENDPOINTS } from '@utils/constants';

function generateMocks(count: number): TAccountsBackendPayload[] {
	return Array.from({ length: count }, () => ({
		duenoCuenta: faker.person.fullName(),
		nombreCuenta: faker.finance.accountName(),
		numeroCuenta: faker.finance.accountNumber(10),
		tarjetaCredito: faker.finance.creditCardIssuer(),
		saldo: Number(faker.finance.amount({ min: 1000000, max: 50000000, dec: 2 })),
		ultimaTransaccion: faker.date.recent().toISOString(),
	}));
}

const ACCOUNTS_RESPONSE_FIXED_MOCKS: TAccountsBackendPayload[] = [
	{
		duenoCuenta: 'James Marcus',
		nombreCuenta: 'Umbrella TF Account',
		numeroCuenta: '0098766122',
		tarjetaCredito: 'mastercard',
		saldo: 23454322,
		ultimaTransaccion: '2025-03-31T06:12:24.677Z',
	},
];

const ACCOUNTS_MOCKS: TAccountsBackendPayload[] = [...ACCOUNTS_RESPONSE_FIXED_MOCKS, ...generateMocks(30)];

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
		method: 'GET',
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
