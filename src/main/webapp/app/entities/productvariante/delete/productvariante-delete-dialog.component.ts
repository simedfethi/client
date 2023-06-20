import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductvariante } from '../productvariante.model';
import { ProductvarianteService } from '../service/productvariante.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './productvariante-delete-dialog.component.html',
})
export class ProductvarianteDeleteDialogComponent {
  productvariante?: IProductvariante;

  constructor(protected productvarianteService: ProductvarianteService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productvarianteService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
