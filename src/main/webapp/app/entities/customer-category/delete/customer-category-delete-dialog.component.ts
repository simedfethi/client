import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICustomerCategory } from '../customer-category.model';
import { CustomerCategoryService } from '../service/customer-category.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './customer-category-delete-dialog.component.html',
})
export class CustomerCategoryDeleteDialogComponent {
  customerCategory?: ICustomerCategory;

  constructor(protected customerCategoryService: CustomerCategoryService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.customerCategoryService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
