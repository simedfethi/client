import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITransactionCRM } from '../transaction-crm.model';
import { TransactionCRMService } from '../service/transaction-crm.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './transaction-crm-delete-dialog.component.html',
})
export class TransactionCRMDeleteDialogComponent {
  transactionCRM?: ITransactionCRM;

  constructor(protected transactionCRMService: TransactionCRMService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.transactionCRMService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
