import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProjectStatus } from '../project-status.model';
import { ProjectStatusService } from '../service/project-status.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './project-status-delete-dialog.component.html',
})
export class ProjectStatusDeleteDialogComponent {
  projectStatus?: IProjectStatus;

  constructor(protected projectStatusService: ProjectStatusService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.projectStatusService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
