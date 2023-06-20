import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMarkSegment } from '../mark-segment.model';
import { MarkSegmentService } from '../service/mark-segment.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './mark-segment-delete-dialog.component.html',
})
export class MarkSegmentDeleteDialogComponent {
  markSegment?: IMarkSegment;

  constructor(protected markSegmentService: MarkSegmentService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.markSegmentService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
