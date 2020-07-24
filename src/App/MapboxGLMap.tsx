import 'mapbox-gl/dist/mapbox-gl.css';
import './MapboxGLMap.scss';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
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
mapboxgl.accessToken = 'pk.eyJ1IjoiZGphZmFyIiwiYSI6ImNrNDdnYWx4bjBzM24zbGxmNHlpZXRrd3oifQ.aVZeGMHH56sUL59KJpMihg';
const MapboxGLMap: React.FC = (): ReactElement => {
	const [mapState, setMapState] = useState<State>();
	const mapContainer = useRef(null);
	useEffect(() => {
		const initializeMap = (): void => {
			const map = new mapboxgl.Map({
				container: mapContainer.current || '',
				style: 'mapbox://styles/mapbox/streets-v11',
				center: [initialState.lng, initialState.lat],
				zoom: initialState.zoom,
			});

			map.on('load', () => {
				const { lng, lat } = map.getCenter();
				map.on('click', (e: mapboxgl.MapMouseEvent): void => {
					const markers = document.getElementsByClassName('mapboxgl-marker');
					if (markers[0]) {
						markers[0].remove();
					}
					new mapboxgl.Marker()
						.setLngLat(e.lngLat)
						.addTo(map);
				});
				setMapState({
					lng: parseFloat(lng.toFixed(initialState.accuracy)),
					lat: parseFloat(lat.toFixed(initialState.accuracy)),
					zoom: parseFloat(map.getZoom().toFixed(initialState.accuracy)),
				});
			});

			map.on('move', () => {
				const { lng, lat } = map.getCenter();
				setMapState({
					lng: parseFloat(lng.toFixed(initialState.accuracy)),
					lat: parseFloat(lat.toFixed(initialState.accuracy)),
					zoom: parseFloat(map.getZoom().toFixed(initialState.accuracy)),
				});
			});
		};
		if (!mapState) {
			initializeMap();
		}
		// eslint-disable-next-line no-console
		console.log(mapState);
	}, [mapState]);
	return <div ref={mapContainer} id='map'></div>;
};

export default MapboxGLMap;
