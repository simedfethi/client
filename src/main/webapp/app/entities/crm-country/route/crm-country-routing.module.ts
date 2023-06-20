import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CrmCountryComponent } from '../list/crm-country.component';
import { CrmCountryDetailComponent } from '../detail/crm-country-detail.component';
import { CrmCountryUpdateComponent } from '../update/crm-country-update.component';
import { CrmCountryRoutingResolveService } from './crm-country-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const crmCountryRoute: Routes = [
  {
    path: '',
    component: CrmCountryComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CrmCountryDetailComponent,
    resolve: {
      crmCountry: CrmCountryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CrmCountryUpdateComponent,
    resolve: {
      crmCountry: CrmCountryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CrmCountryUpdateComponent,
    resolve: {
      crmCountry: CrmCountryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crmCountryRoute)],
  exports: [RouterModule],
})
export class CrmCountryRoutingModule {}
