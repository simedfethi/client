import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmailTemplate } from '../email-template.model';
import { EmailTemplateService } from '../service/email-template.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './email-template-delete-dialog.component.html',
})
export class EmailTemplateDeleteDialogComponent {
  emailTemplate?: IEmailTemplate;

  constructor(protected emailTemplateService: EmailTemplateService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.emailTemplateService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
