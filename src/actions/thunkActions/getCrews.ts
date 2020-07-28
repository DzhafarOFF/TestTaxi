import { FakePostRequestBody, fakePost } from '../../utils/fakeServer';
import { SetCrews, setCrews } from '../setCrews';
import { Dispatch } from 'redux';
import { SearchState } from '../../typings/AppTypes';
import { ThunkAction } from 'redux-thunk';

export const getCrews = (postBodyMock: FakePostRequestBody): ThunkAction<void, SearchState, null, SetCrews> =>
	(dispatch: Dispatch) => {
		fakePost(postBodyMock)
			.then(resBody => dispatch(setCrews(resBody.data.crews_info)))
			.catch(() => {
				throw Error('Fake Post Error');
			});
	};
