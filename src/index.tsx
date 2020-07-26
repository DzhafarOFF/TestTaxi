import App from './App/App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from './configureStore';

const store = configureStore();

const Root: React.FC = () =>
	<Provider store={store}>
		<App />
	</Provider>;

ReactDOM.render(<Root />, document.getElementById('root'));
