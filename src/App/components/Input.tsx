import './Input.scss';
import { FakePostRequestBody, createRequestBody } from '../../utils/fakeServer';
import React, { useCallback, useEffect, useRef } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../typings/AppTypes';
import { getCrews } from '../../actions/thunkActions/getCrews';
import { makeSearch } from '../../actions/thunkActions/makeSearch';
import { selectCrew } from '../../actions/selectCrew';
import { selectOption } from '../../actions/selectOption';
import { setInput } from '../../actions/setInputValue';

const API_KEY = '62d3994d9571411083e726cdcf0b60a2';

const typedSelectorHook: TypedUseSelectorHook<AppState> = useSelector;

const Input: React.FC = () => {
	const wrapperRef = useRef(null);
	const dispatch = useDispatch();
	const store = typedSelectorHook(appStore => ({ search: appStore.search , form: appStore.form }));
	const handleSelectOption = useCallback((e: React.MouseEvent<HTMLLIElement>): void => {
		if (e.currentTarget.dataset.featureId && e.currentTarget.textContent && store.search.searchResults) {
			const option = store.search.searchResults[Number(e.currentTarget.dataset.featureId)];
			const postMock: FakePostRequestBody | null = createRequestBody(option);
			dispatch(setInput(e.currentTarget.textContent));
			dispatch(selectOption(option));
			dispatch(getCrews(postMock));
		}
	},[dispatch, store.search.searchResults]);
	const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.value !== null) {
			const url = `https://api.opencagedata.com/geocode/v1/geojson?q=${e.target.value}&key=${API_KEY}&pretty=1`;
			dispatch(makeSearch(url));
			dispatch(setInput(e.target.value));
		}
	},[dispatch]);
	useEffect(() => {
		if (!store.form.selectedCrew && store.form.crews) {
			dispatch(selectCrew(store.form.crews[0]));
		}
	}, [dispatch, store.form.crews, store.form.selectedCrew]);
	return (
		<div ref={wrapperRef} className='order'>
			<h2>{'Откуда:'}</h2>
			<div className='order__adress'>
				<input className='order__autocomplete-text' value={store.search.inputValue} type="text" onChange={handleInput}/>
				{
					store.search.searchResults
					&& store.search.searchResults.length !== 0
					&& <ul className='order__autocomplete-list' tabIndex={0}>
						{
							store.search.searchResults.map(
								(value, index) => <li key={index} tabIndex={0} onClick={handleSelectOption} className='order__autocomplete-option' data-feature-id={index}>
									{value.properties && value.properties['formatted']}
								</li>
							)
						}
					</ul>
				}
			</div>
		</div>
	);
};

export default Input;
