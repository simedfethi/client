import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SupplierOfferComponent } from './list/supplier-offer.component';
import { SupplierOfferDetailComponent } from './detail/supplier-offer-detail.component';
import { SupplierOfferUpdateComponent } from './update/supplier-offer-update.component';
import { SupplierOfferDeleteDialogComponent } from './delete/supplier-offer-delete-dialog.component';
import { SupplierOfferRoutingModule } from './route/supplier-offer-routing.module';

@NgModule({
  imports: [SharedModule, SupplierOfferRoutingModule],
  declarations: [SupplierOfferComponent, SupplierOfferDetailComponent, SupplierOfferUpdateComponent, SupplierOfferDeleteDialogComponent],
})
export class SupplierOfferModule {}
