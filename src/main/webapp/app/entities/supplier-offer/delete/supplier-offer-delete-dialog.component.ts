import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISupplierOffer } from '../supplier-offer.model';
import { SupplierOfferService } from '../service/supplier-offer.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './supplier-offer-delete-dialog.component.html',
})
export class SupplierOfferDeleteDialogComponent {
  supplierOffer?: ISupplierOffer;

  constructor(protected supplierOfferService: SupplierOfferService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.supplierOfferService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
