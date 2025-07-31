import { Stubby, StubbyData } from 'stubby';
import { INITIAL_FILTERS_ENDPOINT_STUB } from '@mocks/initial-filters.mock';
import { STUBBY_SERVER_PORT } from '@utils/constants';
import { ACCOUNTS_ENDPOINT_STUB } from '@mocks/accounts-response.mock';

const STUB_ENDPOINTS: StubbyData[] = [INITIAL_FILTERS_ENDPOINT_STUB, ACCOUNTS_ENDPOINT_STUB];

const stubby = new Stubby();
const port = STUBBY_SERVER_PORT;
stubby.start(
	{
		stubs: port,
		location: 'localhost',
		quiet: false,
		data: STUB_ENDPOINTS,
	},
	() => {
		console.log(`Stubby mock server running att http://localhost:${port}`);
	}
);
