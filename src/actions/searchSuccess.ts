import { Action, ActionCreator } from 'redux';
import { ActionTypes } from '../typings/constants';

export interface SearchSuccess extends Action<ActionTypes.SEARCH_SUCCESS>{
	type: ActionTypes.SEARCH_SUCCESS
	payload: GeoJSON.Feature[]
}

export const searchSuccess: ActionCreator<SearchSuccess> = (searchResults: GeoJSON.Feature[]) => ({
	type: ActionTypes.SEARCH_SUCCESS,
	payload: searchResults,
});
