import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrmAvancement } from '../crm-avancement.model';
import { CrmAvancementService } from '../service/crm-avancement.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crm-avancement-delete-dialog.component.html',
})
export class CrmAvancementDeleteDialogComponent {
  crmAvancement?: ICrmAvancement;

  constructor(protected crmAvancementService: CrmAvancementService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crmAvancementService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
