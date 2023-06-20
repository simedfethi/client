import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AffaireCategoryComponent } from '../list/affaire-category.component';
import { AffaireCategoryDetailComponent } from '../detail/affaire-category-detail.component';
import { AffaireCategoryUpdateComponent } from '../update/affaire-category-update.component';
import { AffaireCategoryRoutingResolveService } from './affaire-category-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const affaireCategoryRoute: Routes = [
  {
    path: '',
    component: AffaireCategoryComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AffaireCategoryDetailComponent,
    resolve: {
      affaireCategory: AffaireCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AffaireCategoryUpdateComponent,
    resolve: {
      affaireCategory: AffaireCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AffaireCategoryUpdateComponent,
    resolve: {
      affaireCategory: AffaireCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(affaireCategoryRoute)],
  exports: [RouterModule],
})
export class AffaireCategoryRoutingModule {}
