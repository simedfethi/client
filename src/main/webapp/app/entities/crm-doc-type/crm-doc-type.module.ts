import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CrmDocTypeComponent } from './list/crm-doc-type.component';
import { CrmDocTypeDetailComponent } from './detail/crm-doc-type-detail.component';
import { CrmDocTypeUpdateComponent } from './update/crm-doc-type-update.component';
import { CrmDocTypeDeleteDialogComponent } from './delete/crm-doc-type-delete-dialog.component';
import { CrmDocTypeRoutingModule } from './route/crm-doc-type-routing.module';

@NgModule({
  imports: [SharedModule, CrmDocTypeRoutingModule],
  declarations: [CrmDocTypeComponent, CrmDocTypeDetailComponent, CrmDocTypeUpdateComponent, CrmDocTypeDeleteDialogComponent],
})
export class CrmDocTypeModule {}
