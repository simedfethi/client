import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FilterListComponent } from './list/filter-list.component';
import { FilterListDetailComponent } from './detail/filter-list-detail.component';
import { FilterListUpdateComponent } from './update/filter-list-update.component';
import { FilterListDeleteDialogComponent } from './delete/filter-list-delete-dialog.component';
import { FilterListRoutingModule } from './route/filter-list-routing.module';

@NgModule({
  imports: [SharedModule, FilterListRoutingModule],
  declarations: [FilterListComponent, FilterListDetailComponent, FilterListUpdateComponent, FilterListDeleteDialogComponent],
})
export class FilterListModule {}
