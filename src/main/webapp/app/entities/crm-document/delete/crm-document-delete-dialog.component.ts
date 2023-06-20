import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrmDocument } from '../crm-document.model';
import { CrmDocumentService } from '../service/crm-document.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crm-document-delete-dialog.component.html',
})
export class CrmDocumentDeleteDialogComponent {
  crmDocument?: ICrmDocument;

  constructor(protected crmDocumentService: CrmDocumentService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crmDocumentService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
