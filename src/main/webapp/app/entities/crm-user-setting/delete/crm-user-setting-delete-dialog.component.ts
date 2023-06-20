import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrmUserSetting } from '../crm-user-setting.model';
import { CrmUserSettingService } from '../service/crm-user-setting.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crm-user-setting-delete-dialog.component.html',
})
export class CrmUserSettingDeleteDialogComponent {
  crmUserSetting?: ICrmUserSetting;

  constructor(protected crmUserSettingService: CrmUserSettingService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crmUserSettingService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
