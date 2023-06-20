import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrmDocType } from '../crm-doc-type.model';
import { CrmDocTypeService } from '../service/crm-doc-type.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crm-doc-type-delete-dialog.component.html',
})
export class CrmDocTypeDeleteDialogComponent {
  crmDocType?: ICrmDocType;

  constructor(protected crmDocTypeService: CrmDocTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crmDocTypeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
