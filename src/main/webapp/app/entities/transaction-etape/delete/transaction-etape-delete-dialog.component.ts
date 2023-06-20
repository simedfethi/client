import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITransactionEtape } from '../transaction-etape.model';
import { TransactionEtapeService } from '../service/transaction-etape.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './transaction-etape-delete-dialog.component.html',
})
export class TransactionEtapeDeleteDialogComponent {
  transactionEtape?: ITransactionEtape;

  constructor(protected transactionEtapeService: TransactionEtapeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.transactionEtapeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
