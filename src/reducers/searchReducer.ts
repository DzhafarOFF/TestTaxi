import { ActionTypes } from '../typings/constants';
import { Reducer } from 'redux';
import { SearchError } from '../actions/searchError';
import { SearchPending } from '../actions/searchPending';
import { SearchState } from '../typings/AppTypes';
import { SearchSuccess } from '../actions/searchSuccess';
import { SelectOption } from '../actions/selectOption';

type Actions = SearchError | SearchPending | SearchSuccess | SelectOption;

const initialState: SearchState = {
	searchResults: [],
	selectedOption: null,
	pending: false,
};
export const searchReducer: Reducer<SearchState, Actions> = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.SEARCH_ERROR:
			return {
				...state,
				searchResults: [],
				pending: false,
			};
		case ActionTypes.SEARCH_PENDING:
			return {
				...state,
				pending: true,
			};
		case ActionTypes.SEARCH_SUCCESS:
			return {
				...state,
				searchResults: action.payload,
				pending: true,
			};
		case ActionTypes.SELECT_OPTION:
			return {
				searchResults: [],
				selectedOption: action.payload,
				pending: true,
			};
		default:
			return state;
	}
};
