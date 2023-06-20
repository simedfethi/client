import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CrmCountryComponent } from './list/crm-country.component';
import { CrmCountryDetailComponent } from './detail/crm-country-detail.component';
import { CrmCountryUpdateComponent } from './update/crm-country-update.component';
import { CrmCountryDeleteDialogComponent } from './delete/crm-country-delete-dialog.component';
import { CrmCountryRoutingModule } from './route/crm-country-routing.module';

@NgModule({
  imports: [SharedModule, CrmCountryRoutingModule],
  declarations: [CrmCountryComponent, CrmCountryDetailComponent, CrmCountryUpdateComponent, CrmCountryDeleteDialogComponent],
})
export class CrmCountryModule {}
