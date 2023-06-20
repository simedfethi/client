import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CrmContactTypeComponent } from '../list/crm-contact-type.component';
import { CrmContactTypeDetailComponent } from '../detail/crm-contact-type-detail.component';
import { CrmContactTypeUpdateComponent } from '../update/crm-contact-type-update.component';
import { CrmContactTypeRoutingResolveService } from './crm-contact-type-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const crmContactTypeRoute: Routes = [
  {
    path: '',
    component: CrmContactTypeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CrmContactTypeDetailComponent,
    resolve: {
      crmContactType: CrmContactTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CrmContactTypeUpdateComponent,
    resolve: {
      crmContactType: CrmContactTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CrmContactTypeUpdateComponent,
    resolve: {
      crmContactType: CrmContactTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crmContactTypeRoute)],
  exports: [RouterModule],
})
export class CrmContactTypeRoutingModule {}
