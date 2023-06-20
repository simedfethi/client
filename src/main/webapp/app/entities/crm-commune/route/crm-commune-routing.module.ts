import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CrmCommuneComponent } from '../list/crm-commune.component';
import { CrmCommuneDetailComponent } from '../detail/crm-commune-detail.component';
import { CrmCommuneUpdateComponent } from '../update/crm-commune-update.component';
import { CrmCommuneRoutingResolveService } from './crm-commune-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const crmCommuneRoute: Routes = [
  {
    path: '',
    component: CrmCommuneComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CrmCommuneDetailComponent,
    resolve: {
      crmCommune: CrmCommuneRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CrmCommuneUpdateComponent,
    resolve: {
      crmCommune: CrmCommuneRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CrmCommuneUpdateComponent,
    resolve: {
      crmCommune: CrmCommuneRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crmCommuneRoute)],
  exports: [RouterModule],
})
export class CrmCommuneRoutingModule {}
