import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CrmContactComponent } from './list/crm-contact.component';
import { CrmContactDetailComponent } from './detail/crm-contact-detail.component';
import { CrmContactUpdateComponent } from './update/crm-contact-update.component';
import { CrmContactDeleteDialogComponent } from './delete/crm-contact-delete-dialog.component';
import { CrmContactRoutingModule } from './route/crm-contact-routing.module';
import {SearchContactComponent} from "./search-contact/search-contact.component";
import {ActiviteModule} from "../activite/activite.module";

@NgModule({
    imports: [SharedModule, CrmContactRoutingModule, ActiviteModule],
  declarations: [CrmContactComponent, CrmContactDetailComponent, CrmContactUpdateComponent,
    CrmContactDeleteDialogComponent,
    SearchContactComponent],
  exports: [
    SearchContactComponent,
    SearchContactComponent
  ]
})
export class CrmContactModule {}
