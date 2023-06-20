import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CrmContactComponent } from '../list/crm-contact.component';
import { CrmContactDetailComponent } from '../detail/crm-contact-detail.component';
import { CrmContactUpdateComponent } from '../update/crm-contact-update.component';
import { CrmContactRoutingResolveService } from './crm-contact-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const crmContactRoute: Routes = [
  {
    path: '',
    component: CrmContactComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CrmContactDetailComponent,
    resolve: {
      crmContact: CrmContactRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CrmContactUpdateComponent,
    resolve: {
      crmContact: CrmContactRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CrmContactUpdateComponent,
    resolve: {
      crmContact: CrmContactRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crmContactRoute)],
  exports: [RouterModule],
})
export class CrmContactRoutingModule {}
