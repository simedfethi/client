import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProductvarianteComponent } from './list/productvariante.component';
import { ProductvarianteDetailComponent } from './detail/productvariante-detail.component';
import { ProductvarianteUpdateComponent } from './update/productvariante-update.component';
import { ProductvarianteDeleteDialogComponent } from './delete/productvariante-delete-dialog.component';
import { ProductvarianteRoutingModule } from './route/productvariante-routing.module';

@NgModule({
  imports: [SharedModule, ProductvarianteRoutingModule],
  declarations: [
    ProductvarianteComponent,
    ProductvarianteDetailComponent,
    ProductvarianteUpdateComponent,
    ProductvarianteDeleteDialogComponent,
  ],
})
export class ProductvarianteModule {}
