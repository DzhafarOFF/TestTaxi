import mapboxgl, { LngLatLike } from 'mapbox-gl';

export const removeMarkers = (): void => {
	const markers = document.getElementsByClassName('mapboxgl-marker');
	if (markers.length !== 0) {
		while (markers.length > 0) {
			markers[0].remove();
		}
	}
};

export const setMarker = (target: mapboxgl.Map, position: LngLatLike, color: string): void => {
	new mapboxgl.Marker({ color })
		.setLngLat(position)
		.addTo(target);
};
