import { Action, ActionCreator } from 'redux';
import { ActionTypes } from '../typings/constants';
import { Crew } from '../utils/fakeServer';

export interface SetCrews extends Action<ActionTypes.SET_CREWS>{
	type: ActionTypes.SET_CREWS
	payload: Crew[]
}

export const setCrews: ActionCreator<SetCrews> = (crewsInfo: Crew[]) => ({
	type: ActionTypes.SET_CREWS,
	payload: crewsInfo,
});
