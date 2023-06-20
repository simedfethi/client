import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrmCountry } from '../crm-country.model';
import { CrmCountryService } from '../service/crm-country.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crm-country-delete-dialog.component.html',
})
export class CrmCountryDeleteDialogComponent {
  crmCountry?: ICrmCountry;

  constructor(protected crmCountryService: CrmCountryService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crmCountryService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
