import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UniteMesureComponent } from './list/unite-mesure.component';
import { UniteMesureDetailComponent } from './detail/unite-mesure-detail.component';
import { UniteMesureUpdateComponent } from './update/unite-mesure-update.component';
import { UniteMesureDeleteDialogComponent } from './delete/unite-mesure-delete-dialog.component';
import { UniteMesureRoutingModule } from './route/unite-mesure-routing.module';

@NgModule({
  imports: [SharedModule, UniteMesureRoutingModule],
  declarations: [UniteMesureComponent, UniteMesureDetailComponent, UniteMesureUpdateComponent, UniteMesureDeleteDialogComponent],
})
export class UniteMesureModule {}
