import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MarkSegmentComponent } from '../list/mark-segment.component';
import { MarkSegmentDetailComponent } from '../detail/mark-segment-detail.component';
import { MarkSegmentUpdateComponent } from '../update/mark-segment-update.component';
import { MarkSegmentRoutingResolveService } from './mark-segment-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const markSegmentRoute: Routes = [
  {
    path: '',
    component: MarkSegmentComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MarkSegmentDetailComponent,
    resolve: {
      markSegment: MarkSegmentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MarkSegmentUpdateComponent,
    resolve: {
      markSegment: MarkSegmentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MarkSegmentUpdateComponent,
    resolve: {
      markSegment: MarkSegmentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(markSegmentRoute)],
  exports: [RouterModule],
})
export class MarkSegmentRoutingModule {}
