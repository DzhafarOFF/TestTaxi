/* eslint-disable @typescript-eslint/no-unused-vars */
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapboxGLMap.scss';
import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { AppState } from '../../typings/AppTypes';
interface State {
	lng: number
	lat: number
	zoom: number
	accuracy?: number
}
const initialState: State = {
	lng: 53.21,
	lat: 56.86,
	zoom: 10,
	accuracy: 4,
};
const API_KEY = '62d3994d9571411083e726cdcf0b60a2';
mapboxgl.accessToken = 'pk.eyJ1IjoiZGphZmFyIiwiYSI6ImNrNDdnYWx4bjBzM24zbGxmNHlpZXRrd3oifQ.aVZeGMHH56sUL59KJpMihg';

const typedSelectorHook: TypedUseSelectorHook<AppState> = useSelector;

const MapboxGLMap: React.FC = (): ReactElement => {
	const [mapState, setMapState] = useState<mapboxgl.Map>();
	const mapContainer = useRef(null);
	const store = typedSelectorHook(appStore => ({ search: appStore.search }));
	const removeMarkers = (): void => {
		const markers = document.getElementsByClassName('mapboxgl-marker');
		if (markers[0]) {
			markers[0].remove();
		}
	};

	const setMarker = useCallback((target: mapboxgl.Map, position: LngLatLike): void => {
		removeMarkers();

		new mapboxgl.Marker()
			.setLngLat(position)
			.addTo(target);
		target.flyTo({ center: position });
	},[]);

	useEffect(() => {
		const initializeMap = (): void => {
			const map = new mapboxgl.Map({
				container: mapContainer.current || '',
				style: 'mapbox://styles/mapbox/streets-v11',
				center: [initialState.lng, initialState.lat],
				zoom: initialState.zoom,
			});

			map.on('load', () => {
				// eslint-disable-next-line no-console
				console.log('load');
				map.on('click', (e: mapboxgl.MapMouseEvent): void => {
					const [lng, lat] = [e.lngLat.lng, e.lngLat.lat];
					const url = `https://api.opencagedata.com/geocode/v1/geojson?q=${lat}%2C+${lng}&key=${API_KEY}&pretty=1`;
					setMarker(map, e.lngLat);
					// eslint-disable-next-line no-console
					console.log(e.lngLat);
				});
			});
			map.on('move', () => {
				setMapState(map);
			});

			setMapState(map);
		};
		initializeMap();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (mapState) {
			if (store.search.selectedOption && store.search.selectedOption.geometry.type === 'Point') {
				const [lng, lat] = store.search.selectedOption.geometry.coordinates;
				setMarker(mapState, [lng, lat]);
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setMarker, store.search.selectedOption]);
	return <>
		<div ref={mapContainer} id='map'></div>
		{
			store.search.selectedOption
			&& store.search.selectedOption.geometry.type === 'Point'
		}
	</>;
};

export default MapboxGLMap;
