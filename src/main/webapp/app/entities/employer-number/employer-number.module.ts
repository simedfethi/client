import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EmployerNumberComponent } from './list/employer-number.component';
import { EmployerNumberDetailComponent } from './detail/employer-number-detail.component';
import { EmployerNumberUpdateComponent } from './update/employer-number-update.component';
import { EmployerNumberDeleteDialogComponent } from './delete/employer-number-delete-dialog.component';
import { EmployerNumberRoutingModule } from './route/employer-number-routing.module';

@NgModule({
  imports: [SharedModule, EmployerNumberRoutingModule],
  declarations: [
    EmployerNumberComponent,
    EmployerNumberDetailComponent,
    EmployerNumberUpdateComponent,
    EmployerNumberDeleteDialogComponent,
  ],
})
export class EmployerNumberModule {}
