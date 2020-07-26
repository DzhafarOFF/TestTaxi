import { SearchError, searchError } from '../searchError';
import { SearchPending, searchPending } from '../searchPending';
import { SearchSuccess, searchSuccess } from '../searchSuccess';
import { Dispatch } from 'redux';
import { SearchState } from '../../typings/AppTypes';
import { ThunkAction } from 'redux-thunk';
import api from '../../utils/typedFetch';

type Actions = SearchError | SearchPending | SearchSuccess;

export const makeSearch = (url: string): ThunkAction<void, SearchState, null, Actions> =>
	(dispatch: Dispatch) => {
		dispatch(searchPending());
		api<GeoJSON.FeatureCollection>(url)
			.then(response => {
				const results = response.features;
				dispatch(searchSuccess(results));
			})
			.catch(() => dispatch(searchError()));
	};
