import { ActionTypes } from '../typings/constants';
import { FormState } from '../typings/AppTypes';
import { Reducer } from 'redux';
import { SelectCrew } from '../actions/selectCrew';
import { SetCrews } from '../actions/setCrews';
import { SetOrderInfo } from '../actions/setOrderInfo';

type Actions = SetCrews | SelectCrew | SetOrderInfo;

const initialState: FormState = {
	crews: null,
	selectedCrew: null,
	orderInfo: null,
};

export const formReducer: Reducer<FormState, Actions> = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.SET_CREWS:
			return {
				...state,
				crews: action.payload,
			};
		case ActionTypes.SELECT_CREW:
			return {
				...state,
				selectedCrew: action.payload,
			};
		case ActionTypes.SET_ORDER_INFO:
			return {
				...state,
				orderInfo: action.payload,
			};
		default:
			return state;
	}
};
