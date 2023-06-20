import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SupplierCategoryComponent } from './list/supplier-category.component';
import { SupplierCategoryDetailComponent } from './detail/supplier-category-detail.component';
import { SupplierCategoryUpdateComponent } from './update/supplier-category-update.component';
import { SupplierCategoryDeleteDialogComponent } from './delete/supplier-category-delete-dialog.component';
import { SupplierCategoryRoutingModule } from './route/supplier-category-routing.module';

@NgModule({
  imports: [SharedModule, SupplierCategoryRoutingModule],
  declarations: [
    SupplierCategoryComponent,
    SupplierCategoryDetailComponent,
    SupplierCategoryUpdateComponent,
    SupplierCategoryDeleteDialogComponent,
  ],
})
export class SupplierCategoryModule {}
