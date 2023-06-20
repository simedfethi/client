import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CustomerCategoryComponent } from './list/customer-category.component';
import { CustomerCategoryDetailComponent } from './detail/customer-category-detail.component';
import { CustomerCategoryUpdateComponent } from './update/customer-category-update.component';
import { CustomerCategoryDeleteDialogComponent } from './delete/customer-category-delete-dialog.component';
import { CustomerCategoryRoutingModule } from './route/customer-category-routing.module';

@NgModule({
  imports: [SharedModule, CustomerCategoryRoutingModule],
  declarations: [
    CustomerCategoryComponent,
    CustomerCategoryDetailComponent,
    CustomerCategoryUpdateComponent,
    CustomerCategoryDeleteDialogComponent,
  ],
})
export class CustomerCategoryModule {}
