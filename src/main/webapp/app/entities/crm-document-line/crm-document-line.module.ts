import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CrmDocumentLineComponent } from './list/crm-document-line.component';
import { CrmDocumentLineDetailComponent } from './detail/crm-document-line-detail.component';
import { CrmDocumentLineUpdateComponent } from './update/crm-document-line-update.component';
import { CrmDocumentLineDeleteDialogComponent } from './delete/crm-document-line-delete-dialog.component';
import { CrmDocumentLineRoutingModule } from './route/crm-document-line-routing.module';

@NgModule({
  imports: [SharedModule, CrmDocumentLineRoutingModule],
  declarations: [
    CrmDocumentLineComponent,
    CrmDocumentLineDetailComponent,
    CrmDocumentLineUpdateComponent,
    CrmDocumentLineDeleteDialogComponent,
  ],
})
export class CrmDocumentLineModule {}
