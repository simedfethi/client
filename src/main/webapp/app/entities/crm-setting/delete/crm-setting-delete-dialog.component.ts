import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrmSetting } from '../crm-setting.model';
import { CrmSettingService } from '../service/crm-setting.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crm-setting-delete-dialog.component.html',
})
export class CrmSettingDeleteDialogComponent {
  crmSetting?: ICrmSetting;

  constructor(protected crmSettingService: CrmSettingService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crmSettingService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
