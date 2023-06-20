import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CrmContactTypeComponent } from './list/crm-contact-type.component';
import { CrmContactTypeDetailComponent } from './detail/crm-contact-type-detail.component';
import { CrmContactTypeUpdateComponent } from './update/crm-contact-type-update.component';
import { CrmContactTypeDeleteDialogComponent } from './delete/crm-contact-type-delete-dialog.component';
import { CrmContactTypeRoutingModule } from './route/crm-contact-type-routing.module';

@NgModule({
  imports: [SharedModule, CrmContactTypeRoutingModule],
  declarations: [
    CrmContactTypeComponent,
    CrmContactTypeDetailComponent,
    CrmContactTypeUpdateComponent,
    CrmContactTypeDeleteDialogComponent,
  ],
})
export class CrmContactTypeModule {}
