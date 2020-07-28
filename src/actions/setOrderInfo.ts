import { Action, ActionCreator } from 'redux';
import { ActionTypes } from '../typings/constants';
import { FakePostOrderResponseBody } from '../utils/fakeServer';

export interface SetOrderInfo extends Action<ActionTypes.SET_ORDER_INFO>{
	type: ActionTypes.SET_ORDER_INFO
	payload: FakePostOrderResponseBody
}

export const setOrderInfo: ActionCreator<SetOrderInfo> = (orderInfo: FakePostOrderResponseBody) => ({
	type: ActionTypes.SET_ORDER_INFO,
	payload: orderInfo,
});
