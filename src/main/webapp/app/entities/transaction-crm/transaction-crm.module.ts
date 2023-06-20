import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TransactionCRMComponent } from './list/transaction-crm.component';
import { TransactionCRMDetailComponent } from './detail/transaction-crm-detail.component';
import { TransactionCRMUpdateComponent } from './update/transaction-crm-update.component';
import { TransactionCRMDeleteDialogComponent } from './delete/transaction-crm-delete-dialog.component';
import { TransactionCRMRoutingModule } from './route/transaction-crm-routing.module';
import { CrmContactModule } from '../crm-contact/crm-contact.module';
import { CustomerModule } from '../customer/customer.module';
import { ActiviteModule } from '../activite/activite.module';
import { StepbarComponent } from './stepbar/stepbar.component';

@NgModule({
  imports: [SharedModule, TransactionCRMRoutingModule, CrmContactModule, CustomerModule, ActiviteModule],
  declarations: [
    TransactionCRMComponent,
    TransactionCRMDetailComponent,
    TransactionCRMUpdateComponent,
    TransactionCRMDeleteDialogComponent,
    StepbarComponent,
  ],
})
export class TransactionCRMModule {}
