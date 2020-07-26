import { CombinedState, Reducer, combineReducers } from 'redux';
import { AppState } from '../typings/AppTypes';
import { searchReducer } from './searchReducer';

const createRootReducer = (): Reducer<CombinedState<AppState>> => combineReducers<AppState>({
	search: searchReducer,
});

export default createRootReducer;
