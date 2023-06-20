import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CrmDocumentComponent } from './list/crm-document.component';
import { CrmDocumentDetailComponent } from './detail/crm-document-detail.component';
import { CrmDocumentUpdateComponent } from './update/crm-document-update.component';
import { CrmDocumentDeleteDialogComponent } from './delete/crm-document-delete-dialog.component';
import { CrmDocumentRoutingModule } from './route/crm-document-routing.module';

@NgModule({
  imports: [SharedModule, CrmDocumentRoutingModule],
  declarations: [CrmDocumentComponent, CrmDocumentDetailComponent, CrmDocumentUpdateComponent, CrmDocumentDeleteDialogComponent],
})
export class CrmDocumentModule {}
