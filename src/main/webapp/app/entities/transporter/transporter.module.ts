import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TransporterComponent } from './list/transporter.component';
import { TransporterDetailComponent } from './detail/transporter-detail.component';
import { TransporterUpdateComponent } from './update/transporter-update.component';
import { TransporterDeleteDialogComponent } from './delete/transporter-delete-dialog.component';
import { TransporterRoutingModule } from './route/transporter-routing.module';

@NgModule({
  imports: [SharedModule, TransporterRoutingModule],
  declarations: [TransporterComponent, TransporterDetailComponent, TransporterUpdateComponent, TransporterDeleteDialogComponent],
})
export class TransporterModule {}
