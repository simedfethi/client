import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CustomerComponent } from './list/customer.component';
import { CustomerDetailComponent } from './detail/customer-detail.component';
import { CustomerUpdateComponent } from './update/customer-update.component';
import { CustomerDeleteDialogComponent } from './delete/customer-delete-dialog.component';
import { CustomerRoutingModule } from './route/customer-routing.module';
import { AutosizeModule } from 'ngx-autosize';
import { SendmailComponent } from './sendmail/sendmail.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import {ActiviteModule} from "../activite/activite.module";
import {CrmContactModule} from "../crm-contact/crm-contact.module";

@NgModule({
    imports: [SharedModule, CustomerRoutingModule, AutosizeModule, ActiviteModule, CrmContactModule],
  declarations: [
    CustomerComponent,
    CustomerDetailComponent,
    CustomerUpdateComponent,
    CustomerDeleteDialogComponent,
    SendmailComponent,
    SearchCustomerComponent,
  ],
  entryComponents: [CustomerDeleteDialogComponent],
  exports: [SearchCustomerComponent],
})
export class CustomerModule {}
