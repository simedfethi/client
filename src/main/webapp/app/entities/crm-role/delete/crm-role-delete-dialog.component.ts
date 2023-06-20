import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrmRole } from '../crm-role.model';
import { CrmRoleService } from '../service/crm-role.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crm-role-delete-dialog.component.html',
})
export class CrmRoleDeleteDialogComponent {
  crmRole?: ICrmRole;

  constructor(protected crmRoleService: CrmRoleService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crmRoleService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
