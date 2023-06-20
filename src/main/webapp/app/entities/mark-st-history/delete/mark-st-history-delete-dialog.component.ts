import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMarkStHistory } from '../mark-st-history.model';
import { MarkStHistoryService } from '../service/mark-st-history.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './mark-st-history-delete-dialog.component.html',
})
export class MarkStHistoryDeleteDialogComponent {
  markStHistory?: IMarkStHistory;

  constructor(protected markStHistoryService: MarkStHistoryService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.markStHistoryService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
