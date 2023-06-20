import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DeliveryTermComponent } from './list/delivery-term.component';
import { DeliveryTermDetailComponent } from './detail/delivery-term-detail.component';
import { DeliveryTermUpdateComponent } from './update/delivery-term-update.component';
import { DeliveryTermDeleteDialogComponent } from './delete/delivery-term-delete-dialog.component';
import { DeliveryTermRoutingModule } from './route/delivery-term-routing.module';

@NgModule({
  imports: [SharedModule, DeliveryTermRoutingModule],
  declarations: [DeliveryTermComponent, DeliveryTermDetailComponent, DeliveryTermUpdateComponent, DeliveryTermDeleteDialogComponent],
})
export class DeliveryTermModule {}
