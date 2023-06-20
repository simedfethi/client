import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MarkCompaignComponent } from './list/mark-compaign.component';
import { MarkCompaignDetailComponent } from './detail/mark-compaign-detail.component';
import { MarkCompaignUpdateComponent } from './update/mark-compaign-update.component';
import { MarkCompaignDeleteDialogComponent } from './delete/mark-compaign-delete-dialog.component';
import { MarkCompaignRoutingModule } from './route/mark-compaign-routing.module';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [SharedModule, MarkCompaignRoutingModule],
  declarations: [MarkCompaignComponent, MarkCompaignDetailComponent, MarkCompaignUpdateComponent, MarkCompaignDeleteDialogComponent, CreateComponent],
})
export class MarkCompaignModule {}
