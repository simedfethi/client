import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransactionCRM } from '../transaction-crm.model';

@Component({
  selector: 'jhi-transaction-crm-detail',
  templateUrl: './transaction-crm-detail.component.html',
})
export class TransactionCRMDetailComponent implements OnInit {
  transactionCRM: ITransactionCRM | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transactionCRM }) => {
      this.transactionCRM = transactionCRM;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
