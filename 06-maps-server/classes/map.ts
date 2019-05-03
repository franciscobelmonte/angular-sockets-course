import { Marker } from './marker';

export class Map {
    public markers: Marker[] = [];

    constructor () {

    }

    getMarkers () {
        return this.markers;
    }

    addMarker (marker: Marker) {
        this.markers.push(marker);
    }

    deleteMarker (id: string) {
        this.markers = this.markers.filter(marker => marker.id !== id);
    }

    moveMarker(marker: Marker){
        const markerToMove = this.markers.filter(markerToFilter => markerToFilter.id === marker.id)[0];
        markerToMove.lat = marker.lat;
        markerToMove.lng = marker.lng;
    }
}