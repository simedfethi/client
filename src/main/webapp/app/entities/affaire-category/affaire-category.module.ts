import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AffaireCategoryComponent } from './list/affaire-category.component';
import { AffaireCategoryDetailComponent } from './detail/affaire-category-detail.component';
import { AffaireCategoryUpdateComponent } from './update/affaire-category-update.component';
import { AffaireCategoryDeleteDialogComponent } from './delete/affaire-category-delete-dialog.component';
import { AffaireCategoryRoutingModule } from './route/affaire-category-routing.module';

@NgModule({
  imports: [SharedModule, AffaireCategoryRoutingModule],
  declarations: [
    AffaireCategoryComponent,
    AffaireCategoryDetailComponent,
    AffaireCategoryUpdateComponent,
    AffaireCategoryDeleteDialogComponent,
  ],
})
export class AffaireCategoryModule {}
