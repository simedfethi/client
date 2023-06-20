import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrmConcurrent } from '../crm-concurrent.model';
import { CrmConcurrentService } from '../service/crm-concurrent.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crm-concurrent-delete-dialog.component.html',
})
export class CrmConcurrentDeleteDialogComponent {
  crmConcurrent?: ICrmConcurrent;

  constructor(protected crmConcurrentService: CrmConcurrentService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crmConcurrentService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
