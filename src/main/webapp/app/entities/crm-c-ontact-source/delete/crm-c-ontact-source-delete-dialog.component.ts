import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrmCOntactSource } from '../crm-c-ontact-source.model';
import { CrmCOntactSourceService } from '../service/crm-c-ontact-source.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crm-c-ontact-source-delete-dialog.component.html',
})
export class CrmCOntactSourceDeleteDialogComponent {
  crmCOntactSource?: ICrmCOntactSource;

  constructor(protected crmCOntactSourceService: CrmCOntactSourceService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crmCOntactSourceService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
