import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TransportUnitComponent } from './list/transport-unit.component';
import { TransportUnitDetailComponent } from './detail/transport-unit-detail.component';
import { TransportUnitUpdateComponent } from './update/transport-unit-update.component';
import { TransportUnitDeleteDialogComponent } from './delete/transport-unit-delete-dialog.component';
import { TransportUnitRoutingModule } from './route/transport-unit-routing.module';

@NgModule({
  imports: [SharedModule, TransportUnitRoutingModule],
  declarations: [TransportUnitComponent, TransportUnitDetailComponent, TransportUnitUpdateComponent, TransportUnitDeleteDialogComponent],
})
export class TransportUnitModule {}
