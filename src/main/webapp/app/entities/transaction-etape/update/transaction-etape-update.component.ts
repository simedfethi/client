import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TransactionEtapeFormService, TransactionEtapeFormGroup } from './transaction-etape-form.service';
import { ITransactionEtape } from '../transaction-etape.model';
import { TransactionEtapeService } from '../service/transaction-etape.service';

@Component({
  selector: 'jhi-transaction-etape-update',
  templateUrl: './transaction-etape-update.component.html',
})
export class TransactionEtapeUpdateComponent implements OnInit {
  isSaving = false;
  transactionEtape: ITransactionEtape | null = null;

  editForm: TransactionEtapeFormGroup = this.transactionEtapeFormService.createTransactionEtapeFormGroup();

  constructor(
    protected transactionEtapeService: TransactionEtapeService,
    protected transactionEtapeFormService: TransactionEtapeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transactionEtape }) => {
      this.transactionEtape = transactionEtape;
      if (transactionEtape) {
        this.updateForm(transactionEtape);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const transactionEtape = this.transactionEtapeFormService.getTransactionEtape(this.editForm);
    if (transactionEtape.id !== null) {
      this.subscribeToSaveResponse(this.transactionEtapeService.update(transactionEtape));
    } else {
      this.subscribeToSaveResponse(this.transactionEtapeService.create(transactionEtape));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransactionEtape>>): void {
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

  protected updateForm(transactionEtape: ITransactionEtape): void {
    this.transactionEtape = transactionEtape;
    this.transactionEtapeFormService.resetForm(this.editForm, transactionEtape);
  }
}
