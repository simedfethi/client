import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmployerNumber } from '../employer-number.model';
import { EmployerNumberService } from '../service/employer-number.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './employer-number-delete-dialog.component.html',
})
export class EmployerNumberDeleteDialogComponent {
  employerNumber?: IEmployerNumber;

  constructor(protected employerNumberService: EmployerNumberService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.employerNumberService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
