import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrmPermission } from '../crm-permission.model';
import { CrmPermissionService } from '../service/crm-permission.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crm-permission-delete-dialog.component.html',
})
export class CrmPermissionDeleteDialogComponent {
  crmPermission?: ICrmPermission;

  constructor(protected crmPermissionService: CrmPermissionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crmPermissionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
