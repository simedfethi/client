import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CrmAvancementComponent } from '../list/crm-avancement.component';
import { CrmAvancementDetailComponent } from '../detail/crm-avancement-detail.component';
import { CrmAvancementUpdateComponent } from '../update/crm-avancement-update.component';
import { CrmAvancementRoutingResolveService } from './crm-avancement-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const crmAvancementRoute: Routes = [
  {
    path: '',
    component: CrmAvancementComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CrmAvancementDetailComponent,
    resolve: {
      crmAvancement: CrmAvancementRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CrmAvancementUpdateComponent,
    resolve: {
      crmAvancement: CrmAvancementRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CrmAvancementUpdateComponent,
    resolve: {
      crmAvancement: CrmAvancementRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crmAvancementRoute)],
  exports: [RouterModule],
})
export class CrmAvancementRoutingModule {}
