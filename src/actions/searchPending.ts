import { Action, ActionCreator } from 'redux';
import { ActionTypes } from '../typings/constants';

export interface SearchPending extends Action<ActionTypes.SEARCH_PENDING>{
	type: ActionTypes.SEARCH_PENDING
}

export const searchPending: ActionCreator<SearchPending> = () => ({
	type: ActionTypes.SEARCH_PENDING,
});
