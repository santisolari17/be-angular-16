import { Stubby, StubbyData } from 'stubby';
import { INITIAL_FILTERS_ENDPOINT_STUB } from '@mocks/initial-filters.mock';

const STUB_ENDPOINTS: StubbyData[] = [INITIAL_FILTERS_ENDPOINT_STUB];

const stubby = new Stubby();
const port = 3000;
stubby.start(
	{
		stubs: port,
		location: 'localhost',
		quiet: false,
		data: STUB_ENDPOINTS,
	},
	() => {
		console.log(`Stubby mock server running at http://localhost:${port}`);
	}
);
