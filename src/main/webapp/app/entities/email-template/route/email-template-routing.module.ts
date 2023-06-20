import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EmailTemplateComponent } from '../list/email-template.component';
import { EmailTemplateDetailComponent } from '../detail/email-template-detail.component';
import { EmailTemplateUpdateComponent } from '../update/email-template-update.component';
import { EmailTemplateRoutingResolveService } from './email-template-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const emailTemplateRoute: Routes = [
  {
    path: '',
    component: EmailTemplateComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmailTemplateDetailComponent,
    resolve: {
      emailTemplate: EmailTemplateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmailTemplateUpdateComponent,
    resolve: {
      emailTemplate: EmailTemplateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmailTemplateUpdateComponent,
    resolve: {
      emailTemplate: EmailTemplateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(emailTemplateRoute)],
  exports: [RouterModule],
})
export class EmailTemplateRoutingModule {}
