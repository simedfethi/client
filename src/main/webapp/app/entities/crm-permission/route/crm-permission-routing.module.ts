import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CrmPermissionComponent } from '../list/crm-permission.component';
import { CrmPermissionDetailComponent } from '../detail/crm-permission-detail.component';
import { CrmPermissionUpdateComponent } from '../update/crm-permission-update.component';
import { CrmPermissionRoutingResolveService } from './crm-permission-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const crmPermissionRoute: Routes = [
  {
    path: '',
    component: CrmPermissionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CrmPermissionDetailComponent,
    resolve: {
      crmPermission: CrmPermissionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CrmPermissionUpdateComponent,
    resolve: {
      crmPermission: CrmPermissionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CrmPermissionUpdateComponent,
    resolve: {
      crmPermission: CrmPermissionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crmPermissionRoute)],
  exports: [RouterModule],
})
export class CrmPermissionRoutingModule {}
