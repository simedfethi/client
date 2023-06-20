import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CustomerCategoryComponent } from '../list/customer-category.component';
import { CustomerCategoryDetailComponent } from '../detail/customer-category-detail.component';
import { CustomerCategoryUpdateComponent } from '../update/customer-category-update.component';
import { CustomerCategoryRoutingResolveService } from './customer-category-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const customerCategoryRoute: Routes = [
  {
    path: '',
    component: CustomerCategoryComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CustomerCategoryDetailComponent,
    resolve: {
      customerCategory: CustomerCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CustomerCategoryUpdateComponent,
    resolve: {
      customerCategory: CustomerCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CustomerCategoryUpdateComponent,
    resolve: {
      customerCategory: CustomerCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(customerCategoryRoute)],
  exports: [RouterModule],
})
export class CustomerCategoryRoutingModule {}
