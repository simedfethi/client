import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CrmDocumentLineComponent } from '../list/crm-document-line.component';
import { CrmDocumentLineDetailComponent } from '../detail/crm-document-line-detail.component';
import { CrmDocumentLineUpdateComponent } from '../update/crm-document-line-update.component';
import { CrmDocumentLineRoutingResolveService } from './crm-document-line-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const crmDocumentLineRoute: Routes = [
  {
    path: '',
    component: CrmDocumentLineComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CrmDocumentLineDetailComponent,
    resolve: {
      crmDocumentLine: CrmDocumentLineRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CrmDocumentLineUpdateComponent,
    resolve: {
      crmDocumentLine: CrmDocumentLineRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CrmDocumentLineUpdateComponent,
    resolve: {
      crmDocumentLine: CrmDocumentLineRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crmDocumentLineRoute)],
  exports: [RouterModule],
})
export class CrmDocumentLineRoutingModule {}
