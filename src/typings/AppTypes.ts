export type SearchState = {
	searchResults: GeoJSON.Feature[]
	pending: boolean
	selectedOption: GeoJSON.Feature | null
};

export type AppState = {
	search: SearchState
};
