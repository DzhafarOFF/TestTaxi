import { Action, ActionCreator } from 'redux';
import { ActionTypes } from '../typings/constants';

export interface SetInput extends Action<ActionTypes.SET_INPUT>{
	type: ActionTypes.SET_INPUT
	payload: string
}

export const setInput: ActionCreator<SetInput> = (input: string) => ({
	type: ActionTypes.SET_INPUT,
	payload: input,
});
