import React, { useCallback } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../typings/AppTypes';
import { createOrderRequestBody } from '../../utils/fakeServer';
import { makeOrder } from '../../actions/thunkActions/makeOrder';

const typedSelectorHook: TypedUseSelectorHook<AppState> = useSelector;
const MakeOrder: React.FC = () => {
	const store = typedSelectorHook(appStore => ({ form: appStore.form, search: appStore.search }));
	const isDisabled = !store.search.selectedOption || Boolean(store.form.orderInfo);
	const dispatch = useDispatch();
	const handleCLick = useCallback((): void => {
		if (store.search.selectedOption && store.form.selectedCrew) {
			const mockBodyOrderRequest = createOrderRequestBody(store.search.selectedOption, store.form.selectedCrew);
			dispatch(makeOrder(mockBodyOrderRequest));
		}
	},[dispatch, store.form.selectedCrew, store.search.selectedOption]);

	return <button disabled={isDisabled} onClick={handleCLick}>{'Заказать'}</button>;
};

export default MakeOrder;
