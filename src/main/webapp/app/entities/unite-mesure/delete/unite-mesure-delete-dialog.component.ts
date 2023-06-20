import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IUniteMesure } from '../unite-mesure.model';
import { UniteMesureService } from '../service/unite-mesure.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './unite-mesure-delete-dialog.component.html',
})
export class UniteMesureDeleteDialogComponent {
  uniteMesure?: IUniteMesure;

  constructor(protected uniteMesureService: UniteMesureService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.uniteMesureService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
