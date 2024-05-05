import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'maplibre-gl';

interface MarkerAndColor {
  marker: Marker;
  color: string;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css',
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef<HTMLDivElement>;

  // public zoomLevel: number = 3;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(0, 0);
  public markers: MarkerAndColor[] = [];

  ngAfterViewInit(): void {
    if (!this.divMap) {
      throw new Error('The map element is not found');
    }

    this.map = new Map({
      container: this.divMap.nativeElement, // container id
      style: 'https://demotiles.maplibre.org/style.json', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 3, // starting zoom
    });

    // const markerHtmlElement = document.createElement('div');
    // markerHtmlElement.innerHTML = 'Jorge Cayetano';
    // const marker = new Marker({
    //   color: '#FF0000',
    //   element: markerHtmlElement,
    // })
    //   .setLngLat(this.currentLngLat)
    //   .addTo(this.map);

    this.readToLocalStorage();
  }

  // mapListeners(): void {
  //   if (!this.map) {
  //     throw new Error('The map is not initialized');
  //   }

  //   this.map.on('dragend', () => {
  //     this.saveToLocalStorage();
  //   });
  // }

  createMarker(): void {
    if (!this.map) {
      throw new Error('The map is not initialized');
    }

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string): void {
    if (!this.map) {
      throw new Error('The map is not initialized');
    }

    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({ marker, color });
    this.saveToLocalStorage();

    marker.on('dragend', () => {
      this.saveToLocalStorage();
    });
  }

  deleteMarker(index: number): void {
    if (!this.map) {
      throw new Error('The map is not initialized');
    }

    const markerAndColor = this.markers[index];
    markerAndColor.marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker): void {
    if (!this.map) {
      throw new Error('The map is not initialized');
    }

    this.map.flyTo({
      center: marker.getLngLat(),
      zoom: 3,
    });
  }

  saveToLocalStorage(): void {
    if (!this.map) {
      throw new Error('The map is not initialized');
    }

    const plainMarkers: PlainMarker[] = this.markers.map((markerAndColor) => ({
      lngLat: markerAndColor.marker.getLngLat().toArray(),
      color: markerAndColor.color,
    }));

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readToLocalStorage(): void {
    if (!this.map) {
      throw new Error('The map is not initialized');
    }

    const plainMarkers = localStorage.getItem('plainMarkers') ?? '[]';
    if (plainMarkers) {
      const markersParsed: PlainMarker[] = JSON.parse(plainMarkers);

      markersParsed.forEach(({ color, lngLat }) => {
        const [lng, lat] = lngLat;
        const coords = new LngLat(lng, lat);
        this.addMarker(coords, color);
      });
    }
  }
}
