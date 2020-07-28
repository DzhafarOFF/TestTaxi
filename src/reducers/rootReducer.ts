import { CombinedState, Reducer, combineReducers } from 'redux';
import { AppState } from '../typings/AppTypes';
import { formReducer } from './formReducer';
import { searchReducer } from './searchReducer';

const createRootReducer = (): Reducer<CombinedState<AppState>> => combineReducers<AppState>({
	search: searchReducer,
	form: formReducer,
});

export default createRootReducer;
