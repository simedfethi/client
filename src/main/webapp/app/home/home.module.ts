import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import {HOME_ROUTE, LOCATION_ROUTE} from './home.route';
import { HomeComponent } from './home.component';
import { SearchLocationComponent } from './search-location/search-location.component';
import { CrmdashboardComponent } from './crmdashboard/crmdashboard.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE,LOCATION_ROUTE])],
  declarations: [HomeComponent, SearchLocationComponent, CrmdashboardComponent],
})
export class HomeModule {}
