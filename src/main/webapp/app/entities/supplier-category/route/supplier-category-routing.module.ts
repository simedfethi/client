import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SupplierCategoryComponent } from '../list/supplier-category.component';
import { SupplierCategoryDetailComponent } from '../detail/supplier-category-detail.component';
import { SupplierCategoryUpdateComponent } from '../update/supplier-category-update.component';
import { SupplierCategoryRoutingResolveService } from './supplier-category-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const supplierCategoryRoute: Routes = [
  {
    path: '',
    component: SupplierCategoryComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SupplierCategoryDetailComponent,
    resolve: {
      supplierCategory: SupplierCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SupplierCategoryUpdateComponent,
    resolve: {
      supplierCategory: SupplierCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SupplierCategoryUpdateComponent,
    resolve: {
      supplierCategory: SupplierCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(supplierCategoryRoute)],
  exports: [RouterModule],
})
export class SupplierCategoryRoutingModule {}
