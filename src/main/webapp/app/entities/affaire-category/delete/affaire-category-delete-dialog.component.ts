import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAffaireCategory } from '../affaire-category.model';
import { AffaireCategoryService } from '../service/affaire-category.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './affaire-category-delete-dialog.component.html',
})
export class AffaireCategoryDeleteDialogComponent {
  affaireCategory?: IAffaireCategory;

  constructor(protected affaireCategoryService: AffaireCategoryService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.affaireCategoryService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
