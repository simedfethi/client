import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CrmDairaComponent } from './list/crm-daira.component';
import { CrmDairaDetailComponent } from './detail/crm-daira-detail.component';
import { CrmDairaUpdateComponent } from './update/crm-daira-update.component';
import { CrmDairaDeleteDialogComponent } from './delete/crm-daira-delete-dialog.component';
import { CrmDairaRoutingModule } from './route/crm-daira-routing.module';

@NgModule({
  imports: [SharedModule, CrmDairaRoutingModule],
  declarations: [CrmDairaComponent, CrmDairaDetailComponent, CrmDairaUpdateComponent, CrmDairaDeleteDialogComponent],
})
export class CrmDairaModule {}
