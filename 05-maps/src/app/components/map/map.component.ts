import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Place } from '../../models/place';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  infoWindows: google.maps.InfoWindow[] = [];

  places: Place[] = [
    {
      name: 'Udemy',
      lat: 37.784679,
      lng: -122.395936
    },
    {
      name: 'Bahía de San Francisco',
      lat: 37.798933,
      lng: -122.377732
    },
    {
      name: 'The Palace Hotel',
      lat: 37.788578,
      lng: -122.401745
    }
  ];

  constructor() { }

  ngOnInit() {
    this.loadMap();
    this.listenSockets();
  }

  listenSockets() {
    // new-marker
    // move-marker
    // delete-marker
  }

  loadMap () {
    const coordinates = new google.maps.LatLng(37.784679, -122.395936);
    const options: google.maps.MapOptions = {
      center: coordinates,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, options);

    this.map.addListener('click', (coors) => {
      const newPlace: Place = {
        id: new Date().toISOString(),
        name: 'New place',
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng()
      };

      this.addMarker(newPlace);

      // Emit socket event add marker
    });

    for (const place of this.places) {
      this.addMarker(place);
    }
  }

  addMarker (place: Place) {
    const coordinates = new google.maps.LatLng(place.lat, place.lng);

    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: coordinates,
      draggable: true
    });

    google.maps.event.addDomListener(marker, 'dblclick', (coors) => {
      marker.setMap(null);

      // Emit socket event to delete marker
    });

    google.maps.event.addDomListener(marker, 'drag', (coors) => {
      const newMarker = {
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng(),
        name: place.name
      };

      // Emit socket event to move marker
    });

    const body = `<b>${place.name}</b>`;
    const infoWindow = new google.maps.InfoWindow({
      content: body
    });

    google.maps.event.addDomListener(marker, 'click', (coors) => {
      this.infoWindows.forEach(infoWindow => infoWindow.close());
      infoWindow.open(this.map, marker);

      // Emit socket event to move marker
    });

    this.infoWindows.push(infoWindow);

    this.markers.push(marker);
  }

}
