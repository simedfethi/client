import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import {MainsearchService} from "../layouts/mainsearch/mainsearch.service";
import {HttpResponse} from "@angular/common/http";
import {ISearchResult} from "../layouts/mainsearch/mainsearch.model";

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;

  latitude=0;
  longitude=0;

  private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, private router: Router,
              protected mainsearchService:MainsearchService) {}

  ngOnInit(): void {

    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => {
        this.account = account

      });
    console.log("log passage");
    if(!this.accountService.isAuthenticated())
    {

      this.login();
    }

  }
  isAuthenticated():boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.router.navigate(['/login']);
  }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



}
