import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FilterListComponent } from '../list/filter-list.component';
import { FilterListDetailComponent } from '../detail/filter-list-detail.component';
import { FilterListUpdateComponent } from '../update/filter-list-update.component';
import { FilterListRoutingResolveService } from './filter-list-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const filterListRoute: Routes = [
  {
    path: '',
    component: FilterListComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FilterListDetailComponent,
    resolve: {
      filterList: FilterListRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FilterListUpdateComponent,
    resolve: {
      filterList: FilterListRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FilterListUpdateComponent,
    resolve: {
      filterList: FilterListRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(filterListRoute)],
  exports: [RouterModule],
})
export class FilterListRoutingModule {}
