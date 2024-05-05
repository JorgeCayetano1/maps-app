import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Map, Marker } from 'maplibre-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
})
export class MiniMapComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef<HTMLDivElement>;
  @Input() lngLat: [number, number] = [0, 0];

  public map?: Map;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.divMap) throw new Error('The map element is not found');
      if (!this.lngLat) throw new Error('The lngLat is not found');

      this.map = new Map({
        container: this.divMap.nativeElement, // container id
        style: 'https://demotiles.maplibre.org/style.json', // style URL
        center: this.lngLat, // starting position [lng, lat]
        zoom: 3, // starting zoom
        interactive: false,
      });

      this.addMarker();
    }
  }

  addMarker(): void {
    if (!this.map) throw new Error('The map is not initialized');

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    new Marker({
      color: color,
    })
      .setLngLat(this.lngLat)
      .addTo(this.map);
  }
}
