import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrmCommune } from '../crm-commune.model';
import { CrmCommuneService } from '../service/crm-commune.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crm-commune-delete-dialog.component.html',
})
export class CrmCommuneDeleteDialogComponent {
  crmCommune?: ICrmCommune;

  constructor(protected crmCommuneService: CrmCommuneService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crmCommuneService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
