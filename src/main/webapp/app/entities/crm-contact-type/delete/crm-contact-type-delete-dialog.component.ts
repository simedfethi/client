import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrmContactType } from '../crm-contact-type.model';
import { CrmContactTypeService } from '../service/crm-contact-type.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crm-contact-type-delete-dialog.component.html',
})
export class CrmContactTypeDeleteDialogComponent {
  crmContactType?: ICrmContactType;

  constructor(protected crmContactTypeService: CrmContactTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crmContactTypeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
