import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CrmContactFormService, CrmContactFormGroup } from './crm-contact-form.service';
import { ICrmContact } from '../crm-contact.model';
import { CrmContactService } from '../service/crm-contact.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ICrmContactType } from 'app/entities/crm-contact-type/crm-contact-type.model';
import { CrmContactTypeService } from 'app/entities/crm-contact-type/service/crm-contact-type.service';
import { ICrmCOntactSource } from 'app/entities/crm-c-ontact-source/crm-c-ontact-source.model';
import { CrmCOntactSourceService } from 'app/entities/crm-c-ontact-source/service/crm-c-ontact-source.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';

@Component({
  selector: 'jhi-crm-contact-update',
  templateUrl: './crm-contact-update.component.html',
})
export class CrmContactUpdateComponent implements OnInit {
  isSaving = false;
  crmContact: ICrmContact | null = null;

  crmContactTypesSharedCollection: ICrmContactType[] = [];
  crmCOntactSourcesSharedCollection: ICrmCOntactSource[] = [];
  employeesSharedCollection: IEmployee[] = [];
  customersSharedCollection: ICustomer[] = [];

  editForm: CrmContactFormGroup = this.crmContactFormService.createCrmContactFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected crmContactService: CrmContactService,
    protected crmContactFormService: CrmContactFormService,
    protected crmContactTypeService: CrmContactTypeService,
    protected crmCOntactSourceService: CrmCOntactSourceService,
    protected employeeService: EmployeeService,
    protected customerService: CustomerService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCrmContactType = (o1: ICrmContactType | null, o2: ICrmContactType | null): boolean =>
    this.crmContactTypeService.compareCrmContactType(o1, o2);

  compareCrmCOntactSource = (o1: ICrmCOntactSource | null, o2: ICrmCOntactSource | null): boolean =>
    this.crmCOntactSourceService.compareCrmCOntactSource(o1, o2);

  compareEmployee = (o1: IEmployee | null, o2: IEmployee | null): boolean => this.employeeService.compareEmployee(o1, o2);

  compareCustomer = (o1: ICustomer | null, o2: ICustomer | null): boolean => this.customerService.compareCustomer(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmContact }) => {
      this.crmContact = crmContact;
      if (crmContact) {
        this.updateForm(crmContact);
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
    const crmContact = this.crmContactFormService.getCrmContact(this.editForm);
    if (crmContact.id !== null) {
      this.subscribeToSaveResponse(this.crmContactService.update(crmContact));
    } else {
      this.subscribeToSaveResponse(this.crmContactService.create(crmContact));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrmContact>>): void {
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

  protected updateForm(crmContact: ICrmContact): void {
    this.crmContact = crmContact;
    this.crmContactFormService.resetForm(this.editForm, crmContact);

    this.crmContactTypesSharedCollection = this.crmContactTypeService.addCrmContactTypeToCollectionIfMissing<ICrmContactType>(
      this.crmContactTypesSharedCollection,
      crmContact.contacttype
    );
    this.crmCOntactSourcesSharedCollection = this.crmCOntactSourceService.addCrmCOntactSourceToCollectionIfMissing<ICrmCOntactSource>(
      this.crmCOntactSourcesSharedCollection,
      crmContact.crmContactSource
    );
    this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(
      this.employeesSharedCollection,
      crmContact.responsable
    );
    this.customersSharedCollection = this.customerService.addCustomerToCollectionIfMissing<ICustomer>(
      this.customersSharedCollection,
      crmContact.societe
    );
  }

  protected loadRelationshipsOptions(): void {
    this.crmContactTypeService
      .query()
      .pipe(map((res: HttpResponse<ICrmContactType[]>) => res.body ?? []))
      .pipe(
        map((crmContactTypes: ICrmContactType[]) =>
          this.crmContactTypeService.addCrmContactTypeToCollectionIfMissing<ICrmContactType>(crmContactTypes, this.crmContact?.contacttype)
        )
      )
      .subscribe((crmContactTypes: ICrmContactType[]) => (this.crmContactTypesSharedCollection = crmContactTypes));

    this.crmCOntactSourceService
      .query()
      .pipe(map((res: HttpResponse<ICrmCOntactSource[]>) => res.body ?? []))
      .pipe(
        map((crmCOntactSources: ICrmCOntactSource[]) =>
          this.crmCOntactSourceService.addCrmCOntactSourceToCollectionIfMissing<ICrmCOntactSource>(
            crmCOntactSources,
            this.crmContact?.crmContactSource
          )
        )
      )
      .subscribe((crmCOntactSources: ICrmCOntactSource[]) => (this.crmCOntactSourcesSharedCollection = crmCOntactSources));

    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployee[]) =>
          this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(employees, this.crmContact?.responsable)
        )
      )
      .subscribe((employees: IEmployee[]) => (this.employeesSharedCollection = employees));

    this.customerService
      .query()
      .pipe(map((res: HttpResponse<ICustomer[]>) => res.body ?? []))
      .pipe(
        map((customers: ICustomer[]) =>
          this.customerService.addCustomerToCollectionIfMissing<ICustomer>(customers, this.crmContact?.societe)
        )
      )
      .subscribe((customers: ICustomer[]) => (this.customersSharedCollection = customers));
  }
}
