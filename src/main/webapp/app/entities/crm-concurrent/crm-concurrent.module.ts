import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CrmConcurrentComponent } from './list/crm-concurrent.component';
import { CrmConcurrentDetailComponent } from './detail/crm-concurrent-detail.component';
import { CrmConcurrentUpdateComponent } from './update/crm-concurrent-update.component';
import { CrmConcurrentDeleteDialogComponent } from './delete/crm-concurrent-delete-dialog.component';
import { CrmConcurrentRoutingModule } from './route/crm-concurrent-routing.module';

@NgModule({
  imports: [SharedModule, CrmConcurrentRoutingModule],
  declarations: [CrmConcurrentComponent, CrmConcurrentDetailComponent, CrmConcurrentUpdateComponent, CrmConcurrentDeleteDialogComponent],
})
export class CrmConcurrentModule {}
