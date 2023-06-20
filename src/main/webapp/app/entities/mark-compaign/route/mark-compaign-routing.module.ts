import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MarkCompaignComponent } from '../list/mark-compaign.component';
import { MarkCompaignDetailComponent } from '../detail/mark-compaign-detail.component';
import { MarkCompaignUpdateComponent } from '../update/mark-compaign-update.component';
import { MarkCompaignRoutingResolveService } from './mark-compaign-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';
import {CreateComponent} from "../create/create.component";

const markCompaignRoute: Routes = [
  {
    path: '',
    component: MarkCompaignComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MarkCompaignDetailComponent,
    resolve: {
      markCompaign: MarkCompaignRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MarkCompaignUpdateComponent,
    resolve: {
      markCompaign: MarkCompaignRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MarkCompaignUpdateComponent,
    resolve: {
      markCompaign: MarkCompaignRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(markCompaignRoute)],
  exports: [RouterModule],
})
export class MarkCompaignRoutingModule {}
