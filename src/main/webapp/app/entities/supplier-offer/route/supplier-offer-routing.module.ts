import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SupplierOfferComponent } from '../list/supplier-offer.component';
import { SupplierOfferDetailComponent } from '../detail/supplier-offer-detail.component';
import { SupplierOfferUpdateComponent } from '../update/supplier-offer-update.component';
import { SupplierOfferRoutingResolveService } from './supplier-offer-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const supplierOfferRoute: Routes = [
  {
    path: '',
    component: SupplierOfferComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SupplierOfferDetailComponent,
    resolve: {
      supplierOffer: SupplierOfferRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SupplierOfferUpdateComponent,
    resolve: {
      supplierOffer: SupplierOfferRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SupplierOfferUpdateComponent,
    resolve: {
      supplierOffer: SupplierOfferRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(supplierOfferRoute)],
  exports: [RouterModule],
})
export class SupplierOfferRoutingModule {}
