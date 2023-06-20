import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MarkSegmentComponent } from './list/mark-segment.component';
import { MarkSegmentDetailComponent } from './detail/mark-segment-detail.component';
import { MarkSegmentUpdateComponent } from './update/mark-segment-update.component';
import { MarkSegmentDeleteDialogComponent } from './delete/mark-segment-delete-dialog.component';
import { MarkSegmentRoutingModule } from './route/mark-segment-routing.module';

@NgModule({
  imports: [SharedModule, MarkSegmentRoutingModule],
  declarations: [MarkSegmentComponent, MarkSegmentDetailComponent, MarkSegmentUpdateComponent, MarkSegmentDeleteDialogComponent],
})
export class MarkSegmentModule {}
