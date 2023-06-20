import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransactionEtape } from '../transaction-etape.model';

@Component({
  selector: 'jhi-transaction-etape-detail',
  templateUrl: './transaction-etape-detail.component.html',
})
export class TransactionEtapeDetailComponent implements OnInit {
  transactionEtape: ITransactionEtape | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transactionEtape }) => {
      this.transactionEtape = transactionEtape;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
