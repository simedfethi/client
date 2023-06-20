import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TransactionCRMComponent } from '../list/transaction-crm.component';
import { TransactionCRMDetailComponent } from '../detail/transaction-crm-detail.component';
import { TransactionCRMUpdateComponent } from '../update/transaction-crm-update.component';
import { TransactionCRMRoutingResolveService } from './transaction-crm-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const transactionCRMRoute: Routes = [
  {
    path: '',
    component: TransactionCRMComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TransactionCRMDetailComponent,
    resolve: {
      transactionCRM: TransactionCRMRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TransactionCRMUpdateComponent,
    resolve: {
      transactionCRM: TransactionCRMRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TransactionCRMUpdateComponent,
    resolve: {
      transactionCRM: TransactionCRMRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(transactionCRMRoute)],
  exports: [RouterModule],
})
export class TransactionCRMRoutingModule {}
