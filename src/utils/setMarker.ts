import mapboxgl, { LngLatLike } from 'mapbox-gl';

export const removeMarkers = (): void => {
	const markers = document.getElementsByClassName('mapboxgl-marker');
	for (const marker of markers) {
		marker.remove();
	}
};

export const setMarker = (target: mapboxgl.Map, position: LngLatLike, color: string): void => {
	new mapboxgl.Marker({ color })
		.setLngLat(position)
		.addTo(target);
};
