import { FakePostOrderRequest, fakePostOrder } from '../../utils/fakeServer';
import { SetOrderInfo, setOrderInfo } from '../setOrderInfo';
import { Dispatch } from 'redux';
import { SearchState } from '../../typings/AppTypes';
import { ThunkAction } from 'redux-thunk';

export const makeOrder = (postBodyMock: FakePostOrderRequest): ThunkAction<void, SearchState, null, SetOrderInfo> =>
	(dispatch: Dispatch) => {
		fakePostOrder(postBodyMock)
			.then(resBody => dispatch(setOrderInfo(resBody)))
			.catch(() => {
				throw Error('Fake Post Error');
			});
	};
