import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CrmDairaComponent } from '../list/crm-daira.component';
import { CrmDairaDetailComponent } from '../detail/crm-daira-detail.component';
import { CrmDairaUpdateComponent } from '../update/crm-daira-update.component';
import { CrmDairaRoutingResolveService } from './crm-daira-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const crmDairaRoute: Routes = [
  {
    path: '',
    component: CrmDairaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CrmDairaDetailComponent,
    resolve: {
      crmDaira: CrmDairaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CrmDairaUpdateComponent,
    resolve: {
      crmDaira: CrmDairaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CrmDairaUpdateComponent,
    resolve: {
      crmDaira: CrmDairaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crmDairaRoute)],
  exports: [RouterModule],
})
export class CrmDairaRoutingModule {}
