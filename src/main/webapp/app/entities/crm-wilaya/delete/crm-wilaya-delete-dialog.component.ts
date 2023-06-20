import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrmWilaya } from '../crm-wilaya.model';
import { CrmWilayaService } from '../service/crm-wilaya.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crm-wilaya-delete-dialog.component.html',
})
export class CrmWilayaDeleteDialogComponent {
  crmWilaya?: ICrmWilaya;

  constructor(protected crmWilayaService: CrmWilayaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crmWilayaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
