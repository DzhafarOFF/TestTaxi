import { Action, ActionCreator } from 'redux';
import { ActionTypes } from '../typings/constants';

export interface SearchError extends Action<ActionTypes.SEARCH_ERROR>{
	type: ActionTypes.SEARCH_ERROR
}

export const searchError: ActionCreator<SearchError> = () => ({
	type: ActionTypes.SEARCH_ERROR,
});
