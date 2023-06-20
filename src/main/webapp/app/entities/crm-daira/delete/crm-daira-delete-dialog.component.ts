import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrmDaira } from '../crm-daira.model';
import { CrmDairaService } from '../service/crm-daira.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crm-daira-delete-dialog.component.html',
})
export class CrmDairaDeleteDialogComponent {
  crmDaira?: ICrmDaira;

  constructor(protected crmDairaService: CrmDairaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crmDairaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
