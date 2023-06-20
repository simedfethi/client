import {  Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {LANGUAGES} from "../../config/language.constants";
import {Account} from "../../core/auth/account.model";
import {LoginService} from "../../login/login.service";
import {TranslateService} from "@ngx-translate/core";
import {SessionStorageService} from "ngx-webstorage";
import {AccountService} from "../../core/auth/account.service";
import {ProfileService} from "../profiles/profile.service";
import {Router} from "@angular/router";
import {VERSION} from "../../app.constants";
import {EntityNavbarItems} from "../../entities/entity-navbar-items";
 import {HttpClient} from "@angular/common/http";

 import {CustomerService} from "../../entities/customer/service/customer.service";

import {TransactionCRMService} from "../../entities/transaction-crm/service/transaction-crm.service";







@Component({
  selector: 'jhi-navnx',
  templateUrl: './navnx.component.html',
  styleUrls: ['./navnx.component.scss']
})
export class NavnxComponent implements OnInit  {


  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;
  entitiesNavbarItems: any[] = [];
  @Input() notificationNumber;
  @ViewChild('search') searchBox?: ElementRef;


  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    protected customerService: CustomerService,
    protected transactionCRMService: TransactionCRMService,
    private router: Router,
    protected http: HttpClient
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }


  }


  ngOnInit(): void {
    this.entitiesNavbarItems = EntityNavbarItems;
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });

    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
    });


  }

  changeLanguage(languageKey: string): void {
    this.sessionStorageService.store('locale', languageKey);
    this.translateService.use(languageKey);
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  onKeyDown(value: string): void {
    this.search(value);

  }

  search(query: string): void {
    console.log(query);
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['/login']);
    const divm = document.querySelector(".dropdown-menu-end") as HTMLDivElement;
    divm.classList.remove('show');
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
