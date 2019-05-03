import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Place } from '../../models/place';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';

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

  places: Place[] = [];

  constructor(private http: HttpClient, public wsService: WebsocketService) { }

  ngOnInit() {
    this.http.get('http://localhost:5000/map').subscribe((places: Place[]) => {
      this.places = places;
      this.loadMap();
      this.listenSockets();
    });
  }

  listenSockets() {
    this.wsService.listen('new-marker').subscribe((marker: Place) => {
      this.addMarker(marker);
    });

    this.wsService.listen('delete-marker').subscribe((id: string) => {
      for (const marker of this.markers) {
        if (marker.getTitle() === id) {
          marker.setMap(null);
        }
      }
    });

    this.wsService.listen('move-marker').subscribe((marker: Place) => {
      for (const markerToMove of this.markers) {
        if (markerToMove.getTitle() === marker.id) {
          const coordinates = new google.maps.LatLng(marker.lat, marker.lng);
          markerToMove.setPosition(coordinates);
        }
      }
    });
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
      this.wsService.emit('new-marker', newPlace);
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
      draggable: true,
      title: place.id
    });

    google.maps.event.addDomListener(marker, 'dblclick', (coors) => {
      marker.setMap(null);

      // Emit socket event to delete marker
      this.wsService.emit('delete-marker', place.id);
    });

    google.maps.event.addDomListener(marker, 'drag', (coors) => {
      const newMarker = {
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng(),
        name: place.name,
        id: marker.getTitle(),
      };

      // Emit socket event to move marker
      this.wsService.emit('move-marker', newMarker);
    });

    const body = `<b>${place.name}</b>`;
    const infoWindow = new google.maps.InfoWindow({
      content: body
    });

    google.maps.event.addDomListener(marker, 'click', (coors) => {
      this.infoWindows.forEach(infoWindow => infoWindow.close());
      infoWindow.open(this.map, marker);
    });

    this.infoWindows.push(infoWindow);

    this.markers.push(marker);
  }

}
