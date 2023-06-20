import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CrmWilayaComponent } from '../list/crm-wilaya.component';
import { CrmWilayaDetailComponent } from '../detail/crm-wilaya-detail.component';
import { CrmWilayaUpdateComponent } from '../update/crm-wilaya-update.component';
import { CrmWilayaRoutingResolveService } from './crm-wilaya-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const crmWilayaRoute: Routes = [
  {
    path: '',
    component: CrmWilayaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CrmWilayaDetailComponent,
    resolve: {
      crmWilaya: CrmWilayaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CrmWilayaUpdateComponent,
    resolve: {
      crmWilaya: CrmWilayaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CrmWilayaUpdateComponent,
    resolve: {
      crmWilaya: CrmWilayaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crmWilayaRoute)],
  exports: [RouterModule],
})
export class CrmWilayaRoutingModule {}
