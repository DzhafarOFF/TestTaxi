import mapboxgl, { LngLatLike } from 'mapbox-gl';

export const removeMarkers = (): void => {
	const markers = document.getElementsByClassName('mapboxgl-marker');
	if (markers[0]) {
		markers[0].remove();
	}
};

export const setMarker = (target: mapboxgl.Map, position: LngLatLike, color: string): void => {
	removeMarkers();

	new mapboxgl.Marker({ color })
		.setLngLat(position)
		.addTo(target);
	target.flyTo({ center: position });
};
