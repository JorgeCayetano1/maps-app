import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { MapsRoutingModule } from './maps-routing.module';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { MiniMapComponent } from './components/mini-map/mini-map.component';

@NgModule({
  declarations: [
    MiniMapComponent,
    FullScreenPageComponent,
    MapsLayoutComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    SideMenuComponent,
    ZoomRangePageComponent,
  ],
  imports: [CommonModule, MapsRoutingModule],
})
export class MapsModule {}
