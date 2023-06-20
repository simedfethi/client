import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CrmDocTypeComponent } from '../list/crm-doc-type.component';
import { CrmDocTypeDetailComponent } from '../detail/crm-doc-type-detail.component';
import { CrmDocTypeUpdateComponent } from '../update/crm-doc-type-update.component';
import { CrmDocTypeRoutingResolveService } from './crm-doc-type-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const crmDocTypeRoute: Routes = [
  {
    path: '',
    component: CrmDocTypeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CrmDocTypeDetailComponent,
    resolve: {
      crmDocType: CrmDocTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CrmDocTypeUpdateComponent,
    resolve: {
      crmDocType: CrmDocTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CrmDocTypeUpdateComponent,
    resolve: {
      crmDocType: CrmDocTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crmDocTypeRoute)],
  exports: [RouterModule],
})
export class CrmDocTypeRoutingModule {}
