/* eslint-disable @typescript-eslint/no-unused-vars */
import './Input.scss';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../typings/AppTypes';
import GeoJSON from 'geojson';
import { makeSearch } from '../../actions/thunkActions/makeSearch';
import { selectOption } from '../../actions/selectOption';

const API_KEY = '62d3994d9571411083e726cdcf0b60a2';

const typedSelectorHook: TypedUseSelectorHook<AppState> = useSelector;

const Input: React.FC = () => {
	const [inputValue, setInputValue] = useState('');
	// const [inputOptions, setInputOptions] = useState<GeoJSON.Feature[]>();
	const [selectedOption, setSelectedOption] = useState<GeoJSON.Feature>();
	const wrapperRef = useRef(null);
	const dispatch = useDispatch();
	const store = typedSelectorHook(appStore => ({ search: appStore.search }));
	const handleSelectOption = useCallback((e: React.MouseEvent<HTMLLIElement>): void => {
		if (e.currentTarget.dataset.featureId && e.currentTarget.textContent && store.search.searchResults) {
			setInputValue(e.currentTarget.textContent);
			const option = store.search.searchResults[Number(e.currentTarget.dataset.featureId)];
			dispatch(selectOption(option));
			// setInputOptions([]);
		}
	},[dispatch, store.search.searchResults]);
	const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.value !== null) {
			dispatch(selectOption(null));
			const url = `https://api.opencagedata.com/geocode/v1/geojson?q=${e.target.value}&key=${API_KEY}&pretty=1`;
			dispatch(makeSearch(url));
			// setInputOptions(store.search.searchResults);
			setInputValue(e.target.value);
		}
	},[dispatch]);
	useEffect(() => {
		const url = `https://api.opencagedata.com/geocode/v1/geojson?q=${inputValue}&key=${API_KEY}&pretty=1`;
		dispatch(makeSearch(url));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div ref={wrapperRef} className='autocomplete'>
			<input className='autocomplete-text' value={inputValue} type="text" onChange={handleInput}/>
			{
				store.search.searchResults
				&& store.search.searchResults.length !== 0
				&& <ul className='autocomplete-list'>
					{store.search.searchResults.map((value, index) => <li key={index} onClick={handleSelectOption} className='autocomplete-option' data-feature-id={index}>{value.properties && value.properties['formatted']}</li>)}
				</ul>
			}
		</div>
	);
};

export default Input;
