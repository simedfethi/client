import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrmContact } from '../crm-contact.model';
import { CrmContactService } from '../service/crm-contact.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crm-contact-delete-dialog.component.html',
})
export class CrmContactDeleteDialogComponent {
  crmContact?: ICrmContact;

  constructor(protected crmContactService: CrmContactService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crmContactService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
