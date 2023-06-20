import { Route } from '@angular/router';

import { HomeComponent } from './home.component';
import {SearchLocationComponent} from "./search-location/search-location.component";

export const HOME_ROUTE: Route = {
  path: '',
  component: HomeComponent,
  data: {
    pageTitle: 'home.title',
  },

};

export const LOCATION_ROUTE: Route = {
  path: 'locationnm',
  component: SearchLocationComponent,
  data: {
    pageTitle: 'home.title',
  },
};
