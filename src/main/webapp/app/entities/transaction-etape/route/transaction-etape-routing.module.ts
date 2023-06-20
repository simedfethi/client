import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TransactionEtapeComponent } from '../list/transaction-etape.component';
import { TransactionEtapeDetailComponent } from '../detail/transaction-etape-detail.component';
import { TransactionEtapeUpdateComponent } from '../update/transaction-etape-update.component';
import { TransactionEtapeRoutingResolveService } from './transaction-etape-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const transactionEtapeRoute: Routes = [
  {
    path: '',
    component: TransactionEtapeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TransactionEtapeDetailComponent,
    resolve: {
      transactionEtape: TransactionEtapeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TransactionEtapeUpdateComponent,
    resolve: {
      transactionEtape: TransactionEtapeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TransactionEtapeUpdateComponent,
    resolve: {
      transactionEtape: TransactionEtapeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(transactionEtapeRoute)],
  exports: [RouterModule],
})
export class TransactionEtapeRoutingModule {}
