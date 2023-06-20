import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ActiviteFormService, ActiviteFormGroup } from './activite-form.service';
import { IActivite } from '../activite.model';
import { ActiviteService } from '../service/activite.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { ICrmContact } from 'app/entities/crm-contact/crm-contact.model';
import { CrmContactService } from 'app/entities/crm-contact/service/crm-contact.service';
import { ITransactionCRM } from 'app/entities/transaction-crm/transaction-crm.model';
import { TransactionCRMService } from 'app/entities/transaction-crm/service/transaction-crm.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { TypeActivite } from 'app/entities/enumerations/type-activite.model';
import { ImportanceCategory } from 'app/entities/enumerations/importance-category.model';

@Component({
  selector: 'jhi-activite-update',
  templateUrl: './activite-update.component.html',
})
export class ActiviteUpdateComponent implements OnInit {
  isSaving = false;
  activite: IActivite | null = null;
  typeActiviteValues = Object.keys(TypeActivite);
  importanceCategoryValues = Object.keys(ImportanceCategory);

  customersSharedCollection: ICustomer[] = [];
  crmContactsSharedCollection: ICrmContact[] = [];
  transactionCRMSSharedCollection: ITransactionCRM[] = [];
  employeesSharedCollection: IEmployee[] = [];

  editForm: ActiviteFormGroup = this.activiteFormService.createActiviteFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected activiteService: ActiviteService,
    protected activiteFormService: ActiviteFormService,
    protected customerService: CustomerService,
    protected crmContactService: CrmContactService,
    protected transactionCRMService: TransactionCRMService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCustomer = (o1: ICustomer | null, o2: ICustomer | null): boolean => this.customerService.compareCustomer(o1, o2);

  compareCrmContact = (o1: ICrmContact | null, o2: ICrmContact | null): boolean => this.crmContactService.compareCrmContact(o1, o2);

  compareTransactionCRM = (o1: ITransactionCRM | null, o2: ITransactionCRM | null): boolean =>
    this.transactionCRMService.compareTransactionCRM(o1, o2);

  compareEmployee = (o1: IEmployee | null, o2: IEmployee | null): boolean => this.employeeService.compareEmployee(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ activite }) => {
      this.activite = activite;
      if (activite) {
        this.updateForm(activite);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('scibscrmApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const activite = this.activiteFormService.getActivite(this.editForm);
    if (activite.id !== null) {
      this.subscribeToSaveResponse(this.activiteService.update(activite));
    } else {
      this.subscribeToSaveResponse(this.activiteService.create(activite));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IActivite>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(activite: IActivite): void {
    this.activite = activite;
    this.activiteFormService.resetForm(this.editForm, activite);

    this.customersSharedCollection = this.customerService.addCustomerToCollectionIfMissing<ICustomer>(
      this.customersSharedCollection,
      activite.client
    );
    this.crmContactsSharedCollection = this.crmContactService.addCrmContactToCollectionIfMissing<ICrmContact>(
      this.crmContactsSharedCollection,
      activite.crmContact
    );
    this.transactionCRMSSharedCollection = this.transactionCRMService.addTransactionCRMToCollectionIfMissing<ITransactionCRM>(
      this.transactionCRMSSharedCollection,
      activite.transactionCRM
    );
    this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(
      this.employeesSharedCollection,
      activite.employee,
      ...(activite.employeeIncluses ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.customerService
      .query()
      .pipe(map((res: HttpResponse<ICustomer[]>) => res.body ?? []))
      .pipe(
        map((customers: ICustomer[]) => this.customerService.addCustomerToCollectionIfMissing<ICustomer>(customers, this.activite?.client))
      )
      .subscribe((customers: ICustomer[]) => (this.customersSharedCollection = customers));

    this.crmContactService
      .query()
      .pipe(map((res: HttpResponse<ICrmContact[]>) => res.body ?? []))
      .pipe(
        map((crmContacts: ICrmContact[]) =>
          this.crmContactService.addCrmContactToCollectionIfMissing<ICrmContact>(crmContacts, this.activite?.crmContact)
        )
      )
      .subscribe((crmContacts: ICrmContact[]) => (this.crmContactsSharedCollection = crmContacts));

    this.transactionCRMService
      .query()
      .pipe(map((res: HttpResponse<ITransactionCRM[]>) => res.body ?? []))
      .pipe(
        map((transactionCRMS: ITransactionCRM[]) =>
          this.transactionCRMService.addTransactionCRMToCollectionIfMissing<ITransactionCRM>(transactionCRMS, this.activite?.transactionCRM)
        )
      )
      .subscribe((transactionCRMS: ITransactionCRM[]) => (this.transactionCRMSSharedCollection = transactionCRMS));

    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployee[]) =>
          this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(
            employees,
            this.activite?.employee,
            ...(this.activite?.employeeIncluses ?? [])
          )
        )
      )
      .subscribe((employees: IEmployee[]) => (this.employeesSharedCollection = employees));
  }
}
