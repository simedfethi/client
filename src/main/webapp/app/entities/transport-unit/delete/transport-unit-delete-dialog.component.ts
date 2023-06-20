import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITransportUnit } from '../transport-unit.model';
import { TransportUnitService } from '../service/transport-unit.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './transport-unit-delete-dialog.component.html',
})
export class TransportUnitDeleteDialogComponent {
  transportUnit?: ITransportUnit;

  constructor(protected transportUnitService: TransportUnitService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.transportUnitService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
