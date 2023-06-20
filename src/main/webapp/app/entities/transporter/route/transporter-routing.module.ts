import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TransporterComponent } from '../list/transporter.component';
import { TransporterDetailComponent } from '../detail/transporter-detail.component';
import { TransporterUpdateComponent } from '../update/transporter-update.component';
import { TransporterRoutingResolveService } from './transporter-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const transporterRoute: Routes = [
  {
    path: '',
    component: TransporterComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TransporterDetailComponent,
    resolve: {
      transporter: TransporterRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TransporterUpdateComponent,
    resolve: {
      transporter: TransporterRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TransporterUpdateComponent,
    resolve: {
      transporter: TransporterRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(transporterRoute)],
  exports: [RouterModule],
})
export class TransporterRoutingModule {}
