import { Crew, FakePostOrderResponseBody } from '../utils/fakeServer';

export type SearchState = {
	searchResults: GeoJSON.Feature[]
	pending: boolean
	selectedOption: GeoJSON.Feature | null
	inputValue: string
};

export type FormState = {
	crews: Crew[] | null
	selectedCrew: Crew | null
	orderInfo: FakePostOrderResponseBody | null
};

export type AppState = {
	search: SearchState
	form: FormState
};
