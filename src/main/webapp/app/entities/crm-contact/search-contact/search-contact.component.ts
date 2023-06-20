import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CrmContactService} from "../service/crm-contact.service";
import {debounceTime, fromEvent, map, Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ICustomer} from "../../customer/customer.model";
import {ICrmContact, NewCrmContact} from "../crm-contact.model";
import {finalize} from "rxjs/operators";
import dayjs from "dayjs/esm";
import {CrmContactFormGroup, CrmContactFormService} from "../update/crm-contact-form.service";
import {CustomerFormGroup} from "../../customer/update/customer-form.service";

@Component({
  selector: 'jhi-search-contact',
  templateUrl: './search-contact.component.html',
  styleUrls: ['./search-contact.component.scss']
})
export class SearchContactComponent implements AfterViewInit , OnInit {

  @Output() results = new EventEmitter<ICrmContact>();
  @Output() deleteEvent = new EventEmitter<ICrmContact>();
  @Output() savedContact = new EventEmitter<ICrmContact>();


  searchTerm = '';
  firstname='';
  lastname='';
  phonenumber='';
  email='';
  adresse='';
  filteresult: any[]=[];
  crmContactCollection:ICrmContact[]=[];
  modecreation  =false;
  isSearching=false;
  @ViewChild('search') searchBox?: ElementRef;
  @Input() crmContact?: any;

  editForm: CrmContactFormGroup = this.crmContactFormService.createCrmContactFormGroup();
  constructor(
   protected crmContactService:CrmContactService,
   protected crmContactFormService:CrmContactFormService
  ) {

  }

  ngOnInit(): void {


    const currentTime = dayjs();
    this.crmContact.lastUpdate=currentTime;
    this.crmContact.createdTime=currentTime;

     if (this.crmContact.id >0)
    {
      this.selectContact(this.crmContact);
      this.searchTerm= this.crmContact.firstName ;
      this.isSearching=false;
      this.modecreation=true;
    }
  }

  createContact():void {
    this.crmContact=this.crmContactFormService.getCrmContact(this.editForm);
    this.crmContact.createdTime=dayjs();
    this.modecreation=true;
  }

  ngAfterViewInit(): void {

    fromEvent<KeyboardEvent>(this.searchBox?.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        map(searchTerm => searchTerm)
      )
      .subscribe( (x: KeyboardEvent) => {
        this.searchTerm=this.editForm.get('firstName')?.value ?? '' ;
        if (this.searchTerm ==='') {
          this.isSearching=false;
          this.modecreation=false;
        // this.crmContact = {id:0 ,firstName:'',lastName:''};
        }

        if ((this.searchTerm !=='') && !this.modecreation) {
          this.isSearching=true;
          this.rechercheContact(this.searchTerm);
        }
      });
  }
  selectContact(contact):void {
    Object.assign(this.crmContact,contact);
    this.crmContactFormService.resetForm(this.editForm,this.crmContact);
    this.modecreation=true;

    this.results.emit(this.crmContact);
  }
  onSubmit():void {
    this.crmContact = this.crmContactFormService.getCrmContact(this.editForm);
    if (this.crmContact.id!==null)
    {
     // const newcontact= {...this.crmContact , id:null} as NewCrmContact;
      this.subscribeToSaveResponse(this.crmContactService.update(this.crmContact));
    }else {

      this.subscribeToSaveResponse(this.crmContactService.create(this.crmContact));
    }

  }
  updatefirstNameLastName():void {
    const parts=this.searchTerm.split(' ');
    if (parts.length<2)
    {
      this.crmContact.firstName= parts[0].toUpperCase();
      this.crmContact.lastName= '';
    }else {
      this.crmContact.firstName= parts[0].toUpperCase();
      this.crmContact.lastName=  parts[1].toUpperCase();
    }

  }
  emptySearch():void {
    this.searchTerm='';
    this.isSearching=false;
    this.modecreation=false;
    this.deleteEvent.emit(this.crmContact);
    this.crmContact=null;
    this.crmContactFormService.resetForm(this.editForm,this.crmContact);
  }


  rechercheContact(search):void {

    const options= {
      'firstlastName': search,
    }
    this.crmContactService.query(options).subscribe({
      next:(res:HttpResponse<ICrmContact[]>)=>{
        this.crmContactCollection=res.body ?? [];
        this.modecreation=false;
        this.isSearching=false;
        this.results.emit(this.crmContact);
      }
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrmContact>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: (data) => this.onSaveSuccess(data),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(result: HttpResponse<ICrmContact>): void {
    if (result.body !==null){
       Object.assign(this.crmContact,result.body);
      this.crmContactFormService.resetForm(this.editForm,this.crmContact);
      this.savedContact.emit(result.body);
    }

  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    // finalize
  }





}
