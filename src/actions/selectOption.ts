import { Action, ActionCreator } from 'redux';
import { ActionTypes } from '../typings/constants';

export interface SelectOption extends Action<ActionTypes.SELECT_OPTION>{
	type: ActionTypes.SELECT_OPTION
	payload: GeoJSON.Feature | null
}

export const selectOption: ActionCreator<SelectOption> = (searchOption: GeoJSON.Feature | null) => ({
	type: ActionTypes.SELECT_OPTION,
	payload: searchOption,
});
