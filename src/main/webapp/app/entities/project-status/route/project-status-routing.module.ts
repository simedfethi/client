import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProjectStatusComponent } from '../list/project-status.component';
import { ProjectStatusDetailComponent } from '../detail/project-status-detail.component';
import { ProjectStatusUpdateComponent } from '../update/project-status-update.component';
import { ProjectStatusRoutingResolveService } from './project-status-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const projectStatusRoute: Routes = [
  {
    path: '',
    component: ProjectStatusComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProjectStatusDetailComponent,
    resolve: {
      projectStatus: ProjectStatusRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProjectStatusUpdateComponent,
    resolve: {
      projectStatus: ProjectStatusRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProjectStatusUpdateComponent,
    resolve: {
      projectStatus: ProjectStatusRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(projectStatusRoute)],
  exports: [RouterModule],
})
export class ProjectStatusRoutingModule {}
