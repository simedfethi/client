import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CrmUserSettingComponent } from './list/crm-user-setting.component';
import { CrmUserSettingDetailComponent } from './detail/crm-user-setting-detail.component';
import { CrmUserSettingUpdateComponent } from './update/crm-user-setting-update.component';
import { CrmUserSettingDeleteDialogComponent } from './delete/crm-user-setting-delete-dialog.component';
import { CrmUserSettingRoutingModule } from './route/crm-user-setting-routing.module';

@NgModule({
  imports: [SharedModule, CrmUserSettingRoutingModule],
  declarations: [
    CrmUserSettingComponent,
    CrmUserSettingDetailComponent,
    CrmUserSettingUpdateComponent,
    CrmUserSettingDeleteDialogComponent,
  ],
})
export class CrmUserSettingModule {}
