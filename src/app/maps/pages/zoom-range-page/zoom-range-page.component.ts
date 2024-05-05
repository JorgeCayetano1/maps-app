import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LngLat, Map } from 'maplibre-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css',
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap?: ElementRef<HTMLDivElement>;

  public zoomLevel: number = 3;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(
    -75.11489694232802,
    -9.744409898958978
  );

  ngAfterViewInit(): void {
    if (!this.divMap) {
      throw new Error('The map element is not found');
    }

    this.map = new Map({
      container: this.divMap.nativeElement, // container id
      style: 'https://demotiles.maplibre.org/style.json', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  mapListeners(): void {
    if (!this.map) {
      throw new Error('The map is not initialized');
    }

    this.map.on('zoom', () => {
      const zoom = this.map?.getZoom();
      if (zoom) {
        this.zoomLevel = zoom;
      }
    });

    this.map.on('zoomend', () => {
      if (!this.map) {
        throw new Error('The map is not initialized');
      }

      if (this.map.getZoom() < 6) return;
      this.map.zoomTo(6);
    });

    this.map.on('move', () => {
      if (!this.map) {
        throw new Error('The map is not initialized');
      }

      const center = this.map.getCenter();
      if (center) {
        this.currentLngLat = center;
      }
    });
  }

  zoomOut(): void {
    if (!this.map) {
      throw new Error('The map is not initialized');
    }

    this.map.zoomOut();
  }

  zoomIn(): void {
    if (!this.map) {
      throw new Error('The map is not initialized');
    }

    this.map.zoomIn();
  }

  zoomChanged(value: string): void {
    if (!this.map) {
      throw new Error('The map is not initialized');
    }

    this.map.setZoom(+value);
  }
}
