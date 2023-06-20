import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EmailTemplateComponent } from './list/email-template.component';
import { EmailTemplateDetailComponent } from './detail/email-template-detail.component';
import { EmailTemplateUpdateComponent } from './update/email-template-update.component';
import { EmailTemplateDeleteDialogComponent } from './delete/email-template-delete-dialog.component';
import { EmailTemplateRoutingModule } from './route/email-template-routing.module';

@NgModule({
  imports: [SharedModule, EmailTemplateRoutingModule],
  declarations: [EmailTemplateComponent, EmailTemplateDetailComponent, EmailTemplateUpdateComponent, EmailTemplateDeleteDialogComponent],
})
export class EmailTemplateModule {}
