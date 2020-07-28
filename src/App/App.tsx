import './App.scss';
import React, { ReactElement } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppState } from '../typings/AppTypes';
import Crews from './components/Crews';
import Input from './components/Input';
import MakeOrder from './components/MakeOrder';
import MapboxGLMap from './components/MapboxGLMap';
import OrderInfo from './components/OrderInfo';
import SelectedCrew from './components/SelectedCrew';

const typedSelectorHook: TypedUseSelectorHook<AppState> = useSelector;
const App: React.FC = (): ReactElement => {
	const store = typedSelectorHook(appStore => ({ form: appStore.form }));

	return (
		<div className='wrapper'>
			<h1 className='header'>{'Детали заказа'}</h1>
			<div className='order-details'>
				<Input />
				{
					store.form.selectedCrew
					&& <SelectedCrew crew={store.form.selectedCrew}/>
				}
			</div>
			<div className='main'>
				<MapboxGLMap/>
				{
					store.form.crews
					&& <Crews crews={store.form.crews}/>
				}
			</div>
			{
				store.form.orderInfo
				&& <OrderInfo order={store.form.orderInfo}/>
			}
			{
				!store.form.orderInfo
				&& <MakeOrder/>
			}
		</div>
	);
};
export default App;
