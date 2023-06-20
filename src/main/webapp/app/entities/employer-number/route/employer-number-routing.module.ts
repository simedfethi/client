import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EmployerNumberComponent } from '../list/employer-number.component';
import { EmployerNumberDetailComponent } from '../detail/employer-number-detail.component';
import { EmployerNumberUpdateComponent } from '../update/employer-number-update.component';
import { EmployerNumberRoutingResolveService } from './employer-number-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const employerNumberRoute: Routes = [
  {
    path: '',
    component: EmployerNumberComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmployerNumberDetailComponent,
    resolve: {
      employerNumber: EmployerNumberRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmployerNumberUpdateComponent,
    resolve: {
      employerNumber: EmployerNumberRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmployerNumberUpdateComponent,
    resolve: {
      employerNumber: EmployerNumberRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(employerNumberRoute)],
  exports: [RouterModule],
})
export class EmployerNumberRoutingModule {}
