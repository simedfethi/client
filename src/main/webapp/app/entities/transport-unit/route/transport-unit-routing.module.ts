import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TransportUnitComponent } from '../list/transport-unit.component';
import { TransportUnitDetailComponent } from '../detail/transport-unit-detail.component';
import { TransportUnitUpdateComponent } from '../update/transport-unit-update.component';
import { TransportUnitRoutingResolveService } from './transport-unit-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const transportUnitRoute: Routes = [
  {
    path: '',
    component: TransportUnitComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TransportUnitDetailComponent,
    resolve: {
      transportUnit: TransportUnitRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TransportUnitUpdateComponent,
    resolve: {
      transportUnit: TransportUnitRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TransportUnitUpdateComponent,
    resolve: {
      transportUnit: TransportUnitRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(transportUnitRoute)],
  exports: [RouterModule],
})
export class TransportUnitRoutingModule {}
