import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CrmAvancementComponent } from './list/crm-avancement.component';
import { CrmAvancementDetailComponent } from './detail/crm-avancement-detail.component';
import { CrmAvancementUpdateComponent } from './update/crm-avancement-update.component';
import { CrmAvancementDeleteDialogComponent } from './delete/crm-avancement-delete-dialog.component';
import { CrmAvancementRoutingModule } from './route/crm-avancement-routing.module';

@NgModule({
  imports: [SharedModule, CrmAvancementRoutingModule],
  declarations: [CrmAvancementComponent, CrmAvancementDetailComponent, CrmAvancementUpdateComponent, CrmAvancementDeleteDialogComponent],
})
export class CrmAvancementModule {}
