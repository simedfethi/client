import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CrmDocumentComponent } from '../list/crm-document.component';
import { CrmDocumentDetailComponent } from '../detail/crm-document-detail.component';
import { CrmDocumentUpdateComponent } from '../update/crm-document-update.component';
import { CrmDocumentRoutingResolveService } from './crm-document-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const crmDocumentRoute: Routes = [
  {
    path: '',
    component: CrmDocumentComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CrmDocumentDetailComponent,
    resolve: {
      crmDocument: CrmDocumentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CrmDocumentUpdateComponent,
    resolve: {
      crmDocument: CrmDocumentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CrmDocumentUpdateComponent,
    resolve: {
      crmDocument: CrmDocumentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crmDocumentRoute)],
  exports: [RouterModule],
})
export class CrmDocumentRoutingModule {}
