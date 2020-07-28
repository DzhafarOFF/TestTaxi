import { ActionTypes } from '../typings/constants';
import { Reducer } from 'redux';
import { SearchError } from '../actions/searchError';
import { SearchPending } from '../actions/searchPending';
import { SearchState } from '../typings/AppTypes';
import { SearchSuccess } from '../actions/searchSuccess';
import { SelectOption } from '../actions/selectOption';
import { SetInput } from '../actions/setInputValue';

type Actions = SearchError | SearchPending | SearchSuccess | SelectOption | SetInput;

const initialState: SearchState = {
	searchResults: [],
	selectedOption: null,
	pending: false,
	inputValue: '',
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
				pending: false,
			};
		case ActionTypes.SELECT_OPTION:
			return {
				...state,
				searchResults: [],
				selectedOption: action.payload,
				pending: false,
			};
		case ActionTypes.SET_INPUT:
			return {
				...state,
				inputValue: action.payload,
				pending: true,
			};
		default:
			return state;
	}
};
