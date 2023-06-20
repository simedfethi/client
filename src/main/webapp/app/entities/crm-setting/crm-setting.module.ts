import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CrmSettingComponent } from './list/crm-setting.component';
import { CrmSettingDetailComponent } from './detail/crm-setting-detail.component';
import { CrmSettingUpdateComponent } from './update/crm-setting-update.component';
import { CrmSettingDeleteDialogComponent } from './delete/crm-setting-delete-dialog.component';
import { CrmSettingRoutingModule } from './route/crm-setting-routing.module';

@NgModule({
  imports: [SharedModule, CrmSettingRoutingModule],
  declarations: [CrmSettingComponent, CrmSettingDetailComponent, CrmSettingUpdateComponent, CrmSettingDeleteDialogComponent],
})
export class CrmSettingModule {}
