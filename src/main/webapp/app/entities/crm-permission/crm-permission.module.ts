import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CrmPermissionComponent } from './list/crm-permission.component';
import { CrmPermissionDetailComponent } from './detail/crm-permission-detail.component';
import { CrmPermissionUpdateComponent } from './update/crm-permission-update.component';
import { CrmPermissionDeleteDialogComponent } from './delete/crm-permission-delete-dialog.component';
import { CrmPermissionRoutingModule } from './route/crm-permission-routing.module';

@NgModule({
  imports: [SharedModule, CrmPermissionRoutingModule],
  declarations: [CrmPermissionComponent, CrmPermissionDetailComponent, CrmPermissionUpdateComponent, CrmPermissionDeleteDialogComponent],
})
export class CrmPermissionModule {}
