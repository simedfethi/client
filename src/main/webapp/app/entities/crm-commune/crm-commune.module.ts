import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CrmCommuneComponent } from './list/crm-commune.component';
import { CrmCommuneDetailComponent } from './detail/crm-commune-detail.component';
import { CrmCommuneUpdateComponent } from './update/crm-commune-update.component';
import { CrmCommuneDeleteDialogComponent } from './delete/crm-commune-delete-dialog.component';
import { CrmCommuneRoutingModule } from './route/crm-commune-routing.module';

@NgModule({
  imports: [SharedModule, CrmCommuneRoutingModule],
  declarations: [CrmCommuneComponent, CrmCommuneDetailComponent, CrmCommuneUpdateComponent, CrmCommuneDeleteDialogComponent],
})
export class CrmCommuneModule {}
