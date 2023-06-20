import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CrmDocumentFormService, CrmDocumentFormGroup } from './crm-document-form.service';
import { ICrmDocument } from '../crm-document.model';
import { CrmDocumentService } from '../service/crm-document.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ITransporter } from 'app/entities/transporter/transporter.model';
import { TransporterService } from 'app/entities/transporter/service/transporter.service';
import { ITransportUnit } from 'app/entities/transport-unit/transport-unit.model';
import { TransportUnitService } from 'app/entities/transport-unit/service/transport-unit.service';
import { ICrmDocType } from 'app/entities/crm-doc-type/crm-doc-type.model';
import { CrmDocTypeService } from 'app/entities/crm-doc-type/service/crm-doc-type.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { ICrmContact } from 'app/entities/crm-contact/crm-contact.model';
import { CrmContactService } from 'app/entities/crm-contact/service/crm-contact.service';
import { ITransactionCRM } from 'app/entities/transaction-crm/transaction-crm.model';
import { TransactionCRMService } from 'app/entities/transaction-crm/service/transaction-crm.service';

@Component({
  selector: 'jhi-crm-document-update',
  templateUrl: './crm-document-update.component.html',
})
export class CrmDocumentUpdateComponent implements OnInit {
  isSaving = false;
  crmDocument: ICrmDocument | null = null;

  transportersSharedCollection: ITransporter[] = [];
  transportUnitsSharedCollection: ITransportUnit[] = [];
  crmDocTypesSharedCollection: ICrmDocType[] = [];
  employeesSharedCollection: IEmployee[] = [];
  customersSharedCollection: ICustomer[] = [];
  crmContactsSharedCollection: ICrmContact[] = [];
  transactionCRMSSharedCollection: ITransactionCRM[] = [];

  editForm: CrmDocumentFormGroup = this.crmDocumentFormService.createCrmDocumentFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected crmDocumentService: CrmDocumentService,
    protected crmDocumentFormService: CrmDocumentFormService,
    protected transporterService: TransporterService,
    protected transportUnitService: TransportUnitService,
    protected crmDocTypeService: CrmDocTypeService,
    protected employeeService: EmployeeService,
    protected customerService: CustomerService,
    protected crmContactService: CrmContactService,
    protected transactionCRMService: TransactionCRMService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareTransporter = (o1: ITransporter | null, o2: ITransporter | null): boolean => this.transporterService.compareTransporter(o1, o2);

  compareTransportUnit = (o1: ITransportUnit | null, o2: ITransportUnit | null): boolean =>
    this.transportUnitService.compareTransportUnit(o1, o2);

  compareCrmDocType = (o1: ICrmDocType | null, o2: ICrmDocType | null): boolean => this.crmDocTypeService.compareCrmDocType(o1, o2);

  compareEmployee = (o1: IEmployee | null, o2: IEmployee | null): boolean => this.employeeService.compareEmployee(o1, o2);

  compareCustomer = (o1: ICustomer | null, o2: ICustomer | null): boolean => this.customerService.compareCustomer(o1, o2);

  compareCrmContact = (o1: ICrmContact | null, o2: ICrmContact | null): boolean => this.crmContactService.compareCrmContact(o1, o2);

  compareTransactionCRM = (o1: ITransactionCRM | null, o2: ITransactionCRM | null): boolean =>
    this.transactionCRMService.compareTransactionCRM(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmDocument }) => {
      this.crmDocument = crmDocument;
      if (crmDocument) {
        this.updateForm(crmDocument);
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
    const crmDocument = this.crmDocumentFormService.getCrmDocument(this.editForm);
    if (crmDocument.id !== null) {
      this.subscribeToSaveResponse(this.crmDocumentService.update(crmDocument));
    } else {
      this.subscribeToSaveResponse(this.crmDocumentService.create(crmDocument));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrmDocument>>): void {
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

  protected updateForm(crmDocument: ICrmDocument): void {
    this.crmDocument = crmDocument;
    this.crmDocumentFormService.resetForm(this.editForm, crmDocument);

    this.transportersSharedCollection = this.transporterService.addTransporterToCollectionIfMissing<ITransporter>(
      this.transportersSharedCollection,
      crmDocument.transporteur
    );
    this.transportUnitsSharedCollection = this.transportUnitService.addTransportUnitToCollectionIfMissing<ITransportUnit>(
      this.transportUnitsSharedCollection,
      crmDocument.transportunit
    );
    this.crmDocTypesSharedCollection = this.crmDocTypeService.addCrmDocTypeToCollectionIfMissing<ICrmDocType>(
      this.crmDocTypesSharedCollection,
      crmDocument.crmdoctype
    );
    this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(
      this.employeesSharedCollection,
      crmDocument.createdBy
    );
    this.customersSharedCollection = this.customerService.addCustomerToCollectionIfMissing<ICustomer>(
      this.customersSharedCollection,
      crmDocument.customer
    );
    this.crmContactsSharedCollection = this.crmContactService.addCrmContactToCollectionIfMissing<ICrmContact>(
      this.crmContactsSharedCollection,
      crmDocument.crmContact
    );
    this.transactionCRMSSharedCollection = this.transactionCRMService.addTransactionCRMToCollectionIfMissing<ITransactionCRM>(
      this.transactionCRMSSharedCollection,
      crmDocument.transactionCRM
    );
  }

  protected loadRelationshipsOptions(): void {
    this.transporterService
      .query()
      .pipe(map((res: HttpResponse<ITransporter[]>) => res.body ?? []))
      .pipe(
        map((transporters: ITransporter[]) =>
          this.transporterService.addTransporterToCollectionIfMissing<ITransporter>(transporters, this.crmDocument?.transporteur)
        )
      )
      .subscribe((transporters: ITransporter[]) => (this.transportersSharedCollection = transporters));

    this.transportUnitService
      .query()
      .pipe(map((res: HttpResponse<ITransportUnit[]>) => res.body ?? []))
      .pipe(
        map((transportUnits: ITransportUnit[]) =>
          this.transportUnitService.addTransportUnitToCollectionIfMissing<ITransportUnit>(transportUnits, this.crmDocument?.transportunit)
        )
      )
      .subscribe((transportUnits: ITransportUnit[]) => (this.transportUnitsSharedCollection = transportUnits));

    this.crmDocTypeService
      .query()
      .pipe(map((res: HttpResponse<ICrmDocType[]>) => res.body ?? []))
      .pipe(
        map((crmDocTypes: ICrmDocType[]) =>
          this.crmDocTypeService.addCrmDocTypeToCollectionIfMissing<ICrmDocType>(crmDocTypes, this.crmDocument?.crmdoctype)
        )
      )
      .subscribe((crmDocTypes: ICrmDocType[]) => (this.crmDocTypesSharedCollection = crmDocTypes));

    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployee[]) =>
          this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(employees, this.crmDocument?.createdBy)
        )
      )
      .subscribe((employees: IEmployee[]) => (this.employeesSharedCollection = employees));

    this.customerService
      .query()
      .pipe(map((res: HttpResponse<ICustomer[]>) => res.body ?? []))
      .pipe(
        map((customers: ICustomer[]) =>
          this.customerService.addCustomerToCollectionIfMissing<ICustomer>(customers, this.crmDocument?.customer)
        )
      )
      .subscribe((customers: ICustomer[]) => (this.customersSharedCollection = customers));

    this.crmContactService
      .query()
      .pipe(map((res: HttpResponse<ICrmContact[]>) => res.body ?? []))
      .pipe(
        map((crmContacts: ICrmContact[]) =>
          this.crmContactService.addCrmContactToCollectionIfMissing<ICrmContact>(crmContacts, this.crmDocument?.crmContact)
        )
      )
      .subscribe((crmContacts: ICrmContact[]) => (this.crmContactsSharedCollection = crmContacts));

    this.transactionCRMService
      .query()
      .pipe(map((res: HttpResponse<ITransactionCRM[]>) => res.body ?? []))
      .pipe(
        map((transactionCRMS: ITransactionCRM[]) =>
          this.transactionCRMService.addTransactionCRMToCollectionIfMissing<ITransactionCRM>(
            transactionCRMS,
            this.crmDocument?.transactionCRM
          )
        )
      )
      .subscribe((transactionCRMS: ITransactionCRM[]) => (this.transactionCRMSSharedCollection = transactionCRMS));
  }
}
