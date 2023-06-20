import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProductvarianteComponent } from '../list/productvariante.component';
import { ProductvarianteDetailComponent } from '../detail/productvariante-detail.component';
import { ProductvarianteUpdateComponent } from '../update/productvariante-update.component';
import { ProductvarianteRoutingResolveService } from './productvariante-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const productvarianteRoute: Routes = [
  {
    path: '',
    component: ProductvarianteComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductvarianteDetailComponent,
    resolve: {
      productvariante: ProductvarianteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductvarianteUpdateComponent,
    resolve: {
      productvariante: ProductvarianteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductvarianteUpdateComponent,
    resolve: {
      productvariante: ProductvarianteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(productvarianteRoute)],
  exports: [RouterModule],
})
export class ProductvarianteRoutingModule {}
