"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Map {
    constructor() {
        this.markers = [];
    }
    getMarkers() {
        return this.markers;
    }
    addMarker(marker) {
        this.markers.push(marker);
    }
    deleteMarker(id) {
        this.markers = this.markers.filter(marker => marker.id !== id);
    }
    moveMarker(marker) {
        const markerToMove = this.markers.filter(markerToFilter => markerToFilter.id === marker.id)[0];
        markerToMove.lat = marker.lat;
        markerToMove.lng = marker.lng;
    }
}
exports.Map = Map;
