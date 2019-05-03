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
  }

  loadMap () {
    const coordinates = new google.maps.LatLng(37.784679, -122.395936);
    const options: google.maps.MapOptions = {
      center: coordinates,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, options);

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

    this.markers.push(marker);
  }

}
