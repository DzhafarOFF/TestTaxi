import { Store, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReduces from './reducers/rootReducer';
import { searchError } from './actions/searchError';
import { searchPending } from './actions/searchPending';
import { searchSuccess } from './actions/searchSuccess';
import thunk from 'redux-thunk';

const actionCreators = [searchPending, searchSuccess, searchError];
const composeEnhancers = composeWithDevTools({
	actionCreators,
	trace: true,
	traceLimit: 25,
});
export const configureStore = (): Store => createStore(
	createRootReduces(),
	composeEnhancers(
		applyMiddleware(thunk)
	)
);
