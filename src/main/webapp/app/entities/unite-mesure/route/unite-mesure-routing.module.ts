import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UniteMesureComponent } from '../list/unite-mesure.component';
import { UniteMesureDetailComponent } from '../detail/unite-mesure-detail.component';
import { UniteMesureUpdateComponent } from '../update/unite-mesure-update.component';
import { UniteMesureRoutingResolveService } from './unite-mesure-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const uniteMesureRoute: Routes = [
  {
    path: '',
    component: UniteMesureComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UniteMesureDetailComponent,
    resolve: {
      uniteMesure: UniteMesureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UniteMesureUpdateComponent,
    resolve: {
      uniteMesure: UniteMesureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UniteMesureUpdateComponent,
    resolve: {
      uniteMesure: UniteMesureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(uniteMesureRoute)],
  exports: [RouterModule],
})
export class UniteMesureRoutingModule {}
