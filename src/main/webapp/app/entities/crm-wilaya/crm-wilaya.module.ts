import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CrmWilayaComponent } from './list/crm-wilaya.component';
import { CrmWilayaDetailComponent } from './detail/crm-wilaya-detail.component';
import { CrmWilayaUpdateComponent } from './update/crm-wilaya-update.component';
import { CrmWilayaDeleteDialogComponent } from './delete/crm-wilaya-delete-dialog.component';
import { CrmWilayaRoutingModule } from './route/crm-wilaya-routing.module';

@NgModule({
  imports: [SharedModule, CrmWilayaRoutingModule],
  declarations: [CrmWilayaComponent, CrmWilayaDetailComponent, CrmWilayaUpdateComponent, CrmWilayaDeleteDialogComponent],
})
export class CrmWilayaModule {}
