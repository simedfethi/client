import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CrmCOntactSourceComponent } from '../list/crm-c-ontact-source.component';
import { CrmCOntactSourceDetailComponent } from '../detail/crm-c-ontact-source-detail.component';
import { CrmCOntactSourceUpdateComponent } from '../update/crm-c-ontact-source-update.component';
import { CrmCOntactSourceRoutingResolveService } from './crm-c-ontact-source-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const crmCOntactSourceRoute: Routes = [
  {
    path: '',
    component: CrmCOntactSourceComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CrmCOntactSourceDetailComponent,
    resolve: {
      crmCOntactSource: CrmCOntactSourceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CrmCOntactSourceUpdateComponent,
    resolve: {
      crmCOntactSource: CrmCOntactSourceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CrmCOntactSourceUpdateComponent,
    resolve: {
      crmCOntactSource: CrmCOntactSourceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crmCOntactSourceRoute)],
  exports: [RouterModule],
})
export class CrmCOntactSourceRoutingModule {}
