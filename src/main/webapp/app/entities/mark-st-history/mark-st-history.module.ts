import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MarkStHistoryComponent } from './list/mark-st-history.component';
import { MarkStHistoryDetailComponent } from './detail/mark-st-history-detail.component';
import { MarkStHistoryUpdateComponent } from './update/mark-st-history-update.component';
import { MarkStHistoryDeleteDialogComponent } from './delete/mark-st-history-delete-dialog.component';
import { MarkStHistoryRoutingModule } from './route/mark-st-history-routing.module';

@NgModule({
  imports: [SharedModule, MarkStHistoryRoutingModule],
  declarations: [MarkStHistoryComponent, MarkStHistoryDetailComponent, MarkStHistoryUpdateComponent, MarkStHistoryDeleteDialogComponent],
})
export class MarkStHistoryModule {}
