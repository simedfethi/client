import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MarkStHistoryComponent } from '../list/mark-st-history.component';
import { MarkStHistoryDetailComponent } from '../detail/mark-st-history-detail.component';
import { MarkStHistoryUpdateComponent } from '../update/mark-st-history-update.component';
import { MarkStHistoryRoutingResolveService } from './mark-st-history-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const markStHistoryRoute: Routes = [
  {
    path: '',
    component: MarkStHistoryComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MarkStHistoryDetailComponent,
    resolve: {
      markStHistory: MarkStHistoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MarkStHistoryUpdateComponent,
    resolve: {
      markStHistory: MarkStHistoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MarkStHistoryUpdateComponent,
    resolve: {
      markStHistory: MarkStHistoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(markStHistoryRoute)],
  exports: [RouterModule],
})
export class MarkStHistoryRoutingModule {}
