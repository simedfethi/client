import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CrmConcurrentComponent } from '../list/crm-concurrent.component';
import { CrmConcurrentDetailComponent } from '../detail/crm-concurrent-detail.component';
import { CrmConcurrentUpdateComponent } from '../update/crm-concurrent-update.component';
import { CrmConcurrentRoutingResolveService } from './crm-concurrent-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const crmConcurrentRoute: Routes = [
  {
    path: '',
    component: CrmConcurrentComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CrmConcurrentDetailComponent,
    resolve: {
      crmConcurrent: CrmConcurrentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CrmConcurrentUpdateComponent,
    resolve: {
      crmConcurrent: CrmConcurrentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CrmConcurrentUpdateComponent,
    resolve: {
      crmConcurrent: CrmConcurrentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crmConcurrentRoute)],
  exports: [RouterModule],
})
export class CrmConcurrentRoutingModule {}
