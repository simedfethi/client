import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMarkCompaign } from '../mark-compaign.model';
import { MarkCompaignService } from '../service/mark-compaign.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './mark-compaign-delete-dialog.component.html',
})
export class MarkCompaignDeleteDialogComponent {
  markCompaign?: IMarkCompaign;

  constructor(protected markCompaignService: MarkCompaignService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.markCompaignService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
