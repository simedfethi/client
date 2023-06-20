import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDeliveryTerm } from '../delivery-term.model';
import { DeliveryTermService } from '../service/delivery-term.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './delivery-term-delete-dialog.component.html',
})
export class DeliveryTermDeleteDialogComponent {
  deliveryTerm?: IDeliveryTerm;

  constructor(protected deliveryTermService: DeliveryTermService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.deliveryTermService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
