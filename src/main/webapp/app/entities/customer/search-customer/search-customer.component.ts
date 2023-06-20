import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {debounceTime, fromEvent, map, Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import dayjs from 'dayjs/esm';
import {CustomerService} from '../service/customer.service';
import {ICustomer, NewCustomer} from '../customer.model';
import {ICustomerCategory} from "../../customer-category/customer-category.model";
import {CustomerCategoryService} from "../../customer-category/service/customer-category.service";
import {CustomerFormGroup, CustomerFormService} from "../update/customer-form.service";

@Component({
  selector: 'jhi-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.scss'],
})
export class SearchCustomerComponent implements AfterViewInit, OnInit {
  @Output() results = new EventEmitter<ICustomer>();
  isSaving = false;
  editForm: CustomerFormGroup = this.customerFormService.createCustomerFormGroup();


  searchTerm = '';
  phonenumber = '';
  email = '';
  adresse = '';
  filteresult: any[] = [];
  customerCollection: ICustomer[] = [];
  modecreation = false;
  isSearching = false;
  @ViewChild('search') searchBox?: ElementRef;
  @Input() customer?: any;
  customerCategoriesSharedCollection: ICustomerCategory[] = [];
  constructor(protected customerService: CustomerService,
              protected customerCategoryService: CustomerCategoryService,
              protected customerFormService: CustomerFormService,
  ) {}

   compareCustomerCategory = (o1: ICustomerCategory | null, o2: ICustomerCategory | null): boolean =>
    this.customerCategoryService.compareCustomerCategory(o1, o2);


  ngOnInit(): void {
    const currentTime = dayjs();
    if (this.customer) {
      this.customer.lastUpdate = currentTime;
      this.customer.createdTime = currentTime;
     this.selectContact(this.customer);
      if (this.customer.id > 0) {
        this.searchTerm = this.customer.company;
        this.isSearching = false;
        this.modecreation = true;
      }
    }
    this.loadEntities();
  }


    createContact(): void {
      this.customer=this.customerFormService.getCustomer(this.editForm);
      this.customer.createdTime=dayjs();

    this.modecreation = true;
  }

  ngAfterViewInit(): void {
    fromEvent<KeyboardEvent>(this.searchBox?.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        map(searchTerm => searchTerm)
      )
      .subscribe((x: KeyboardEvent) => {
        this.searchTerm=this.editForm.get('company')?.value ?? '';
        if (this.searchTerm === '') {
          this.isSearching = false;
          this.modecreation = false;
          this.customer = { id: 0, company: '' };
        }

        if (this.searchTerm !== '') {
          this.isSearching = true;
          if(!this.modecreation) {
            this.rechercheContact(this.searchTerm);
          }
        }
      });
  }
   selectContact(contact): void {
    this.customer = contact;
    this.customerFormService.resetForm(this.editForm,this.customer);
    this.modecreation = true;
    this.searchTerm = this.customer.company;

    this.results.emit(this.customer);

  }
  onSubmit(): void {
    this.isSaving = true;
    const customer = this.customerFormService.getCustomer(this.editForm);
    console.log('submit call');
    if (customer.id !== null) {
      this.subscribeToSaveResponse(this.customerService.update(customer));
    } else {
      this.subscribeToSaveResponse(this.customerService.create(customer));
    }

  }

  emptySearch(): void {

    this.customerFormService.resetForm(this.editForm,this.customer);
    this.searchTerm = '';
    this.isSearching = false;
    this.modecreation = false;
  }

  rechercheContact(search): void {
    const options = {
      'company.contains': search,
    };
    this.customerService.query(options).subscribe({
      next: (res: HttpResponse<ICustomer[]>) => {
        this.customerCollection = res.body ?? [];
        this.modecreation = false;
        this.isSearching = false;
        this.results.emit(this.customer);
      },
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomer>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: data => this.onSaveSuccess(data),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(result: HttpResponse<ICustomer>): void {
    if (result.body !== null) {
      Object.assign(this.customer , result.body);
      this.results.emit(this.customer);
      this.customerFormService.resetForm(this.editForm,this.customer);
    }
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    // finalize
    this.isSaving = false;
  }
  protected loadEntities(): void {

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
      .subscribe(
        (customerCategories: ICustomerCategory[]) => (
          this.customerCategoriesSharedCollection = customerCategories));

  }
}
