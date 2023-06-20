import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CrmRoleComponent } from '../list/crm-role.component';
import { CrmRoleDetailComponent } from '../detail/crm-role-detail.component';
import { CrmRoleUpdateComponent } from '../update/crm-role-update.component';
import { CrmRoleRoutingResolveService } from './crm-role-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const crmRoleRoute: Routes = [
  {
    path: '',
    component: CrmRoleComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CrmRoleDetailComponent,
    resolve: {
      crmRole: CrmRoleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CrmRoleUpdateComponent,
    resolve: {
      crmRole: CrmRoleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CrmRoleUpdateComponent,
    resolve: {
      crmRole: CrmRoleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crmRoleRoute)],
  exports: [RouterModule],
})
export class CrmRoleRoutingModule {}
