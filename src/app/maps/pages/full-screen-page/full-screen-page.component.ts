import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Map } from 'maplibre-gl';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css',
})
export class FullScreenPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap?: ElementRef<HTMLDivElement>;
  public map?: Map;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.divMap) {
        throw new Error('The map element is not found');
      }

      this.map = new Map({
        container: this.divMap.nativeElement, // container id
        style: 'https://demotiles.maplibre.org/style.json', // style URL
        center: [0, 0], // starting position [lng, lat]
        zoom: 1, // starting zoom
      });
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
    // throw new Error('Method not implemented.');
    // if (this.divMap) {
    //   this.divMap.nativeElement.remove();
    // }
  }
}
