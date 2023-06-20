import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DeliveryTermComponent } from '../list/delivery-term.component';
import { DeliveryTermDetailComponent } from '../detail/delivery-term-detail.component';
import { DeliveryTermUpdateComponent } from '../update/delivery-term-update.component';
import { DeliveryTermRoutingResolveService } from './delivery-term-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const deliveryTermRoute: Routes = [
  {
    path: '',
    component: DeliveryTermComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DeliveryTermDetailComponent,
    resolve: {
      deliveryTerm: DeliveryTermRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DeliveryTermUpdateComponent,
    resolve: {
      deliveryTerm: DeliveryTermRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DeliveryTermUpdateComponent,
    resolve: {
      deliveryTerm: DeliveryTermRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(deliveryTermRoute)],
  exports: [RouterModule],
})
export class DeliveryTermRoutingModule {}
