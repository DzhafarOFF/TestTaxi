/* eslint-disable @typescript-eslint/no-unused-vars */
import './Input.scss';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import GeoJSON from 'geojson';
const API_KEY = '62d3994d9571411083e726cdcf0b60a2';
function api<T>(urlApi: string): Promise<T> {
	return fetch(urlApi)
		.then(response => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return response.json() as Promise<T>;
		});
}
const Input: React.FC = () => {
	const [inputValue, setInputValue] = useState('');
	const [inputOptions, setInputOptions] = useState<GeoJSON.Feature[]>();
	const [selectedOption, setSelectedOption] = useState<GeoJSON.Feature>();
	const wrapperRef = useRef(null);
	const handleSelectOption = useCallback((e: React.MouseEvent<HTMLLIElement>): void => {
		if (e.currentTarget.dataset.featureId && e.currentTarget.textContent && inputOptions) {
			setInputValue(e.currentTarget.textContent);
			setSelectedOption(inputOptions[Number(e.currentTarget.dataset.featureId)]);
			setInputOptions([]);
		}
	},[inputOptions]);
	const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.value !== null) {
			const url = `https://api.opencagedata.com/geocode/v1/geojson?q=${e.target.value}&key=${API_KEY}&pretty=1`;
			api<GeoJSON.FeatureCollection>(url).then(result => {
				// eslint-disable-next-line no-console
				console.log(result);
				setInputOptions(result.features);
			}).catch((error: Error) => {
				throw new Error(error.message);
			});
			setInputValue(e.target.value);
		}
	},[]);
	useEffect(() => {
		const url = `https://api.opencagedata.com/geocode/v1/geojson?q=${inputValue}&key=${API_KEY}&pretty=1`;
		api<GeoJSON.FeatureCollection>(url).then(result => {
			setInputOptions(result.features);
			// eslint-disable-next-line no-console
			console.log(result);
		}).catch((error: Error) => {
			throw new Error(error.message);
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div ref={wrapperRef} className='autocomplete'>
			<input className='autocomplete-text' value={inputValue} type="text" onChange={handleInput}/>
			{
				inputOptions
				&& inputOptions.length !== 0
				&& <ul className='autocomplete-list'>
					{inputOptions.map((value, index) => <li key={index} onClick={handleSelectOption} className='autocomplete-option' data-feature-id={index}>{value.properties && value.properties['formatted']}</li>)}
				</ul>
			}
		</div>
	);
};

export default Input;
