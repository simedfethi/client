import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISupplierCategory } from '../supplier-category.model';
import { SupplierCategoryService } from '../service/supplier-category.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './supplier-category-delete-dialog.component.html',
})
export class SupplierCategoryDeleteDialogComponent {
  supplierCategory?: ISupplierCategory;

  constructor(protected supplierCategoryService: SupplierCategoryService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.supplierCategoryService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
