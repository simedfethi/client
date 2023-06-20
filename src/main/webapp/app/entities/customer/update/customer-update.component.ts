import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {  Observable  } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICustomer } from '../customer.model';
import { CustomerService } from '../service/customer.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { CustomerType } from 'app/entities/enumerations/customer-type.model';
import { ActiviteService } from '../../activite/service/activite.service';
import { IActivite, NewActivite } from '../../activite/activite.model';
import { TypeActivite } from '../../enumerations/type-activite.model';
import dayjs from 'dayjs/esm';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SendmailComponent } from '../sendmail/sendmail.component';
import { ASC, DESC } from '../../../config/navigation.constants';
import {CustomerFormGroup, CustomerFormService} from "./customer-form.service";
import {ICrmCOntactSource} from "../../crm-c-ontact-source/crm-c-ontact-source.model";
import {IEmployerNumber} from "../../employer-number/employer-number.model";
import {ICustomerCategory} from "../../customer-category/customer-category.model";
import {IMonnaie} from "../../monnaie/monnaie.model";
import {ICrmContact} from "../../crm-contact/crm-contact.model";
import {EmployerNumberService} from "../../employer-number/service/employer-number.service";
import {MonnaieService} from "../../monnaie/service/monnaie.service";
import {CrmContactService} from "../../crm-contact/service/crm-contact.service";
import {CustomerCategoryService} from "../../customer-category/service/customer-category.service";
import {CrmCOntactSourceService} from "../../crm-c-ontact-source/service/crm-c-ontact-source.service";

declare function loadMap(lat: any, long: any, customer: any): void;

@Component({
  selector: 'jhi-customer-update',
  templateUrl: './customer-update.component.html',
})
export class CustomerUpdateComponent implements OnInit, AfterViewInit {
  customer: ICustomer | null = null;
  isSaving = false;
  customerTypeValues = Object.keys(CustomerType);
  employeesSharedCollection: IEmployee[] = [];
  activiteCollection: IActivite[] = [];
  crmCOntactSourcesSharedCollection: ICrmCOntactSource[] = [];
  employerNumbersSharedCollection: IEmployerNumber[] = [];
  customerCategoriesSharedCollection: ICustomerCategory[] = [];
  monnaiesSharedCollection: IMonnaie[] = [];
  crmContactsSharedCollection: ICrmContact[] = [];

  editForm: CustomerFormGroup = this.customerFormService.createCustomerFormGroup();
  sms = '';
  predicate = 'id';
  ascending = true;

  crmContactList: ICrmContact[] = [];

  @ViewChild('whoAreYou') whoAreYouRef?: ElementRef<HTMLElement>;
  constructor(
    protected renderer: Renderer2,
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected customerService: CustomerService,
    protected customerFormService: CustomerFormService,
    protected employeeService: EmployeeService,
    protected activiteService: ActiviteService,
    protected activatedRoute: ActivatedRoute,
    protected crmCOntactSourceService: CrmCOntactSourceService,
    protected employerNumberService: EmployerNumberService,
    protected customerCategoryService: CustomerCategoryService,
    protected monnaieService: MonnaieService,
    protected crmContactService: CrmContactService,

    protected fb: FormBuilder,
    protected modalService: NgbModal
  ) {}

  compareEmployee = (o1: IEmployee | null, o2: IEmployee | null): boolean => this.employeeService.compareEmployee(o1, o2);

  compareCrmCOntactSource = (o1: ICrmCOntactSource | null, o2: ICrmCOntactSource | null): boolean =>
    this.crmCOntactSourceService.compareCrmCOntactSource(o1, o2);

  compareEmployerNumber = (o1: IEmployerNumber | null, o2: IEmployerNumber | null): boolean =>
    this.employerNumberService.compareEmployerNumber(o1, o2);

  compareCustomerCategory = (o1: ICustomerCategory | null, o2: ICustomerCategory | null): boolean =>
    this.customerCategoryService.compareCustomerCategory(o1, o2);

  compareMonnaie = (o1: IMonnaie | null, o2: IMonnaie | null): boolean => this.monnaieService.compareMonnaie(o1, o2);

  compareCrmContact = (o1: ICrmContact | null, o2: ICrmContact | null): boolean => this.crmContactService.compareCrmContact(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customer }) => {
      this.customer = customer;
      if (customer) {
        this.updateForm(customer);
        this.activitebyCustomerByid();
        this.crmContactList=customer.crmContacts;
      }

      this.loadRelationshipsOptions();
    });


  }
  ngAfterViewInit(): void {
    this.loadPosition();
   }
  ajouterContact(e): void {
   e.preventDefault();
    const contact = { id: 0 };
    this.crmContactList.push(contact);
  }

  loadPosition():void {
    if (this.customer?.latitude) {
      loadMap(this.customer.latitude, this.customer.longitude, '${this.customer?.company}');
    }
  }
  activitebyCustomerByid(): void {
    this.ascending = false;
    this.predicate = 'heureActivite';
    this.activiteService
      .query({
        'clientId.equals': this.customer?.id,
        size: 200,
        sort: this.getSortQueryParam(this.predicate, this.ascending),
      })
      .subscribe({
        next: (res: HttpResponse<IActivite[]>) => {
          this.activiteCollection = res.body ?? [];
        },
      });
  }

  openmodalEmail(): void {
    const modalRef = this.modalService.open(SendmailComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.customer = this.customer;
  }
  handleResults(crmcontact): void {
    const customer = this.customerFormService.getCustomer(this.editForm);
     customer.crmContacts=this.crmContactList;
    this.updateForm(customer as ICustomer);
    console.log(customer);
  }
  onContactDelete(crmcontact): void {
    const customer = this.customerFormService.getCustomer(this.editForm);
    this.crmContactList=this.crmContactList.filter((c)=> c.id !== crmcontact.id);
    customer.crmContacts=this.crmContactList;
    this.updateForm(customer as ICustomer);
    console.log(customer);
  }


  insertCustomerActivity(): void {
    const xx = {
      client: this.customer,
      typeactivite: TypeActivite.SMS,
      note: this.sms,
      heureActivite: dayjs(),
    } as NewActivite;
    console.log(xx);
    this.activiteService.create(xx).subscribe({
      next: res => {
        console.log(res.body);
        this.activiteCollection.push(res.body as IActivite);
        this.sms = '';

          },
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
     const customer = this.customerFormService.getCustomer(this.editForm);
     if (customer.id !== null) {
      this.subscribeToSaveResponse(this.customerService.update(customer));
    } else {
      this.subscribeToSaveResponse(this.customerService.create(customer));
    }
     console.log(customer);
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomer>>): void {
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



  protected updateForm(customer: ICustomer): void {
    this.customer = customer;
    this.customerFormService.resetForm(this.editForm, customer);

    this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(
      this.employeesSharedCollection,
      customer.commercial
    );
    this.crmCOntactSourcesSharedCollection = this.crmCOntactSourceService.addCrmCOntactSourceToCollectionIfMissing<ICrmCOntactSource>(
      this.crmCOntactSourcesSharedCollection,
      customer.customerSource
    );
    this.employerNumbersSharedCollection = this.employerNumberService.addEmployerNumberToCollectionIfMissing<IEmployerNumber>(
      this.employerNumbersSharedCollection,
      customer.nombreEmployee
    );
    this.customerCategoriesSharedCollection = this.customerCategoryService.addCustomerCategoryToCollectionIfMissing<ICustomerCategory>(
      this.customerCategoriesSharedCollection,
      customer.categorie
    );
    this.monnaiesSharedCollection = this.monnaieService.addMonnaieToCollectionIfMissing<IMonnaie>(
      this.monnaiesSharedCollection,
      customer.caMonnaie
    );
    this.crmContactsSharedCollection = this.crmContactService.addCrmContactToCollectionIfMissing<ICrmContact>(
      this.crmContactsSharedCollection,
      ...(customer.crmContacts ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployee[]) =>
          this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(employees, this.customer?.commercial)
        )
      )
      .subscribe((employees: IEmployee[]) => (this.employeesSharedCollection = employees));

    this.crmCOntactSourceService
      .query()
      .pipe(map((res: HttpResponse<ICrmCOntactSource[]>) => res.body ?? []))
      .pipe(
        map((crmCOntactSources: ICrmCOntactSource[]) =>
          this.crmCOntactSourceService.addCrmCOntactSourceToCollectionIfMissing<ICrmCOntactSource>(
            crmCOntactSources,
            this.customer?.customerSource
          )
        )
      )
      .subscribe((crmCOntactSources: ICrmCOntactSource[]) => (this.crmCOntactSourcesSharedCollection = crmCOntactSources));

    this.employerNumberService
      .query()
      .pipe(map((res: HttpResponse<IEmployerNumber[]>) => res.body ?? []))
      .pipe(
        map((employerNumbers: IEmployerNumber[]) =>
          this.employerNumberService.addEmployerNumberToCollectionIfMissing<IEmployerNumber>(employerNumbers, this.customer?.nombreEmployee)
        )
      )
      .subscribe((employerNumbers: IEmployerNumber[]) => (this.employerNumbersSharedCollection = employerNumbers));

    this.customerCategoryService
      .query()
      .pipe(map((res: HttpResponse<ICustomerCategory[]>) => res.body ?? []))
      .pipe(
        map((customerCategories: ICustomerCategory[]) =>
          this.customerCategoryService.addCustomerCategoryToCollectionIfMissing<ICustomerCategory>(
            customerCategories,
            this.customer?.categorie
          )
        )
      )
      .subscribe((customerCategories: ICustomerCategory[]) => (this.customerCategoriesSharedCollection = customerCategories));

    this.monnaieService
      .query()
      .pipe(map((res: HttpResponse<IMonnaie[]>) => res.body ?? []))
      .pipe(
        map((monnaies: IMonnaie[]) => this.monnaieService.addMonnaieToCollectionIfMissing<IMonnaie>(monnaies, this.customer?.caMonnaie))
      )
      .subscribe((monnaies: IMonnaie[]) => (this.monnaiesSharedCollection = monnaies));

    this.crmContactService
      .query()
      .pipe(map((res: HttpResponse<ICrmContact[]>) => res.body ?? []))
      .pipe(
        map((crmContacts: ICrmContact[]) =>
          this.crmContactService.addCrmContactToCollectionIfMissing<ICrmContact>(crmContacts, ...(this.customer?.crmContacts ?? []))
        )
      )
      .subscribe((crmContacts: ICrmContact[]) => (this.crmContactsSharedCollection = crmContacts));
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }
}
