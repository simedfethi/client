import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CrmRoleComponent } from './list/crm-role.component';
import { CrmRoleDetailComponent } from './detail/crm-role-detail.component';
import { CrmRoleUpdateComponent } from './update/crm-role-update.component';
import { CrmRoleDeleteDialogComponent } from './delete/crm-role-delete-dialog.component';
import { CrmRoleRoutingModule } from './route/crm-role-routing.module';

@NgModule({
  imports: [SharedModule, CrmRoleRoutingModule],
  declarations: [CrmRoleComponent, CrmRoleDetailComponent, CrmRoleUpdateComponent, CrmRoleDeleteDialogComponent],
})
export class CrmRoleModule {}
