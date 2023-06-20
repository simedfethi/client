import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CrmCOntactSourceComponent } from './list/crm-c-ontact-source.component';
import { CrmCOntactSourceDetailComponent } from './detail/crm-c-ontact-source-detail.component';
import { CrmCOntactSourceUpdateComponent } from './update/crm-c-ontact-source-update.component';
import { CrmCOntactSourceDeleteDialogComponent } from './delete/crm-c-ontact-source-delete-dialog.component';
import { CrmCOntactSourceRoutingModule } from './route/crm-c-ontact-source-routing.module';

@NgModule({
  imports: [SharedModule, CrmCOntactSourceRoutingModule],
  declarations: [
    CrmCOntactSourceComponent,
    CrmCOntactSourceDetailComponent,
    CrmCOntactSourceUpdateComponent,
    CrmCOntactSourceDeleteDialogComponent,
  ],
})
export class CrmCOntactSourceModule {}
