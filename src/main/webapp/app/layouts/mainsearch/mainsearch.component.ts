import {Component, ElementRef,   ViewChild} from '@angular/core';
import {LoginService} from "../../login/login.service";
import {TranslateService} from "@ngx-translate/core";
import {SessionStorageService} from "ngx-webstorage";
import {AccountService} from "../../core/auth/account.service";
import {ProfileService} from "../profiles/profile.service";
import {CustomerService} from "../../entities/customer/service/customer.service";
import {TransactionCRMService} from "../../entities/transaction-crm/service/transaction-crm.service";
import {Router} from "@angular/router";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ICustomer} from "../../entities/customer/customer.model";
import {ITransactionCRM} from "../../entities/transaction-crm/transaction-crm.model";
import {debounceTime, fromEvent, map} from "rxjs";
import {ICrmContact} from "../../entities/crm-contact/crm-contact.model";
import {CrmContactService} from "../../entities/crm-contact/service/crm-contact.service";
import {MainsearchService} from "./mainsearch.service";
import {ISearchResult} from "./mainsearch.model";

@Component({
  selector: 'jhi-mainsearch',
  templateUrl: './mainsearch.component.html',
  styleUrls: ['./mainsearch.component.scss']
})
export class MainsearchComponent  {

  searchTerm='';

  customersCollection: ICustomer[]=[];
  transactionCollection: ITransactionCRM[]=[];
  contactsCollections : ICrmContact[]= [];
  searchResult : ISearchResult = {customerList:[],transactionCRMList:[],crmContactList:[]};
  @ViewChild('search')
  searchBox?: ElementRef;

  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    protected customerService: CustomerService,
    protected transactionCRMService:TransactionCRMService,
    protected crmContactService :CrmContactService,
    protected mainsearchService:MainsearchService,
    private router: Router,
    protected http:HttpClient
  ) { }



  ngAfterViewInit(): void {
    fromEvent<KeyboardEvent>(this.searchBox?.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        map(searchTerm => searchTerm)
      )
      .subscribe( (x: KeyboardEvent) => {
        if (this.searchTerm !=='') {
          this.recherche(this.searchTerm);
        }
      });
  }



  recherche(search) :void {
    const options1= {
      'criteria':search.toUpperCase(),
    }

    this.mainsearchService.query(options1).subscribe({
      next:(res:HttpResponse<ISearchResult>) => {
        this.searchResult=res.body ?? {customerList:[],transactionCRMList:[],crmContactList:[]} ;
        console.log(res.body);
      }

    });
  }
  navigateToRoute(route):void {
    this.router.navigate([route]);
  }

}
