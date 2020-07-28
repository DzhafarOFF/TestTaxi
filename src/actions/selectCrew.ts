import { Action, ActionCreator } from 'redux';
import { ActionTypes } from '../typings/constants';
import { Crew } from '../utils/fakeServer';

export interface SelectCrew extends Action<ActionTypes.SELECT_CREW>{
	type: ActionTypes.SELECT_CREW
	payload: Crew
}

export const selectCrew: ActionCreator<SelectCrew> = (crew: Crew) => ({
	type: ActionTypes.SELECT_CREW,
	payload: crew,
});
