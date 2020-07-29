import 'mapbox-gl/dist/mapbox-gl.css';
import './MapboxGLMap.scss';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { removeMarkers, setMarker } from '../../utils/setMarker';
import { AppState } from '../../typings/AppTypes';
import { makeSearch } from '../../actions/thunkActions/makeSearch';
import mapboxgl from 'mapbox-gl';

interface State {
	lng: number
	lat: number
	zoom: number
	accuracy?: number
}
// Russia, Izhevsk
const initialState: State = {
	lng: 53.21,
	lat: 56.86,
	zoom: 10,
};

const API_KEY = '62d3994d9571411083e726cdcf0b60a2';
mapboxgl.accessToken = 'pk.eyJ1IjoiZGphZmFyIiwiYSI6ImNrNDdnYWx4bjBzM24zbGxmNHlpZXRrd3oifQ.aVZeGMHH56sUL59KJpMihg';

const typedSelectorHook: TypedUseSelectorHook<AppState> = useSelector;

const MapboxGLMap: React.FC = (): ReactElement => {
	const [mapState, setMapState] = useState<mapboxgl.Map>();
	const mapContainer = useRef(null);
	const store = typedSelectorHook(appStore => ({ search: appStore.search , form: appStore.form }));
	const dispatch = useDispatch();

	useEffect(() => {
		const initializeMap = (): void => {
			const map = new mapboxgl.Map({
				container: mapContainer.current || '',
				style: 'mapbox://styles/mapbox/streets-v11',
				center: [initialState.lng, initialState.lat],
				zoom: initialState.zoom,
			});

			map.on('load', () => {
				map.on('click', (e: mapboxgl.MapMouseEvent): void => {
					const [lng, lat] = [e.lngLat.lng, e.lngLat.lat];
					const url = `https://api.opencagedata.com/geocode/v1/geojson?q=${lat}%2C+${lng}&key=${API_KEY}&pretty=1`;
					const markerColor = '#F9F871';
					dispatch(makeSearch(url));
					removeMarkers();
					setMarker(map, e.lngLat, markerColor);
					setMapState(map);
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
				const markerColor = '#F9F871';
				removeMarkers();
				setMarker(mapState, [lng, lat], markerColor);
				mapState.flyTo({ center: [lng, lat] });
			}
		}
	}, [mapState, store.search.selectedOption]);
	useEffect(() => {
		if (mapState) {
			if (store.form.crews) {
				store.form.crews.forEach(crew => {
					const { lon, lat } = crew;
					const markerColor = '#00C896';
					setMarker(mapState, [lon, lat], markerColor);
				});
			}
		}
	}, [store.form.crews, mapState]);

	return <div ref={mapContainer} id='map'></div>;
};

export default MapboxGLMap;
