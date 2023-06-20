import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TransactionEtapeComponent } from './list/transaction-etape.component';
import { TransactionEtapeDetailComponent } from './detail/transaction-etape-detail.component';
import { TransactionEtapeUpdateComponent } from './update/transaction-etape-update.component';
import { TransactionEtapeDeleteDialogComponent } from './delete/transaction-etape-delete-dialog.component';
import { TransactionEtapeRoutingModule } from './route/transaction-etape-routing.module';

@NgModule({
  imports: [SharedModule, TransactionEtapeRoutingModule],
  declarations: [
    TransactionEtapeComponent,
    TransactionEtapeDetailComponent,
    TransactionEtapeUpdateComponent,
    TransactionEtapeDeleteDialogComponent,
  ],
})
export class TransactionEtapeModule {}
