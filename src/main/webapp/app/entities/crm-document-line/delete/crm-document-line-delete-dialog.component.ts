import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrmDocumentLine } from '../crm-document-line.model';
import { CrmDocumentLineService } from '../service/crm-document-line.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crm-document-line-delete-dialog.component.html',
})
export class CrmDocumentLineDeleteDialogComponent {
  crmDocumentLine?: ICrmDocumentLine;

  constructor(protected crmDocumentLineService: CrmDocumentLineService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crmDocumentLineService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
