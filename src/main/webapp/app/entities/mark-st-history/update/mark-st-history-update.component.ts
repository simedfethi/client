import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { MarkStHistoryFormService, MarkStHistoryFormGroup } from './mark-st-history-form.service';
import { IMarkStHistory } from '../mark-st-history.model';
import { MarkStHistoryService } from '../service/mark-st-history.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { ITransactionCRM } from 'app/entities/transaction-crm/transaction-crm.model';
import { TransactionCRMService } from 'app/entities/transaction-crm/service/transaction-crm.service';
import { ITransactionEtape } from 'app/entities/transaction-etape/transaction-etape.model';
import { TransactionEtapeService } from 'app/entities/transaction-etape/service/transaction-etape.service';

@Component({
  selector: 'jhi-mark-st-history-update',
  templateUrl: './mark-st-history-update.component.html',
})
export class MarkStHistoryUpdateComponent implements OnInit {
  isSaving = false;
  markStHistory: IMarkStHistory | null = null;

  employeesSharedCollection: IEmployee[] = [];
  transactionCRMSSharedCollection: ITransactionCRM[] = [];
  transactionEtapesSharedCollection: ITransactionEtape[] = [];

  editForm: MarkStHistoryFormGroup = this.markStHistoryFormService.createMarkStHistoryFormGroup();

  constructor(
    protected markStHistoryService: MarkStHistoryService,
    protected markStHistoryFormService: MarkStHistoryFormService,
    protected employeeService: EmployeeService,
    protected transactionCRMService: TransactionCRMService,
    protected transactionEtapeService: TransactionEtapeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareEmployee = (o1: IEmployee | null, o2: IEmployee | null): boolean => this.employeeService.compareEmployee(o1, o2);

  compareTransactionCRM = (o1: ITransactionCRM | null, o2: ITransactionCRM | null): boolean =>
    this.transactionCRMService.compareTransactionCRM(o1, o2);

  compareTransactionEtape = (o1: ITransactionEtape | null, o2: ITransactionEtape | null): boolean =>
    this.transactionEtapeService.compareTransactionEtape(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ markStHistory }) => {
      this.markStHistory = markStHistory;
      if (markStHistory) {
        this.updateForm(markStHistory);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const markStHistory = this.markStHistoryFormService.getMarkStHistory(this.editForm);
    if (markStHistory.id !== null) {
      this.subscribeToSaveResponse(this.markStHistoryService.update(markStHistory));
    } else {
      this.subscribeToSaveResponse(this.markStHistoryService.create(markStHistory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMarkStHistory>>): void {
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

  protected updateForm(markStHistory: IMarkStHistory): void {
    this.markStHistory = markStHistory;
    this.markStHistoryFormService.resetForm(this.editForm, markStHistory);

    this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(
      this.employeesSharedCollection,
      markStHistory.createdby
    );
    this.transactionCRMSSharedCollection = this.transactionCRMService.addTransactionCRMToCollectionIfMissing<ITransactionCRM>(
      this.transactionCRMSSharedCollection,
      markStHistory.transactionCRM
    );
    this.transactionEtapesSharedCollection = this.transactionEtapeService.addTransactionEtapeToCollectionIfMissing<ITransactionEtape>(
      this.transactionEtapesSharedCollection,
      markStHistory.trEtape
    );
  }

  protected loadRelationshipsOptions(): void {
    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployee[]) =>
          this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(employees, this.markStHistory?.createdby)
        )
      )
      .subscribe((employees: IEmployee[]) => (this.employeesSharedCollection = employees));

    this.transactionCRMService
      .query()
      .pipe(map((res: HttpResponse<ITransactionCRM[]>) => res.body ?? []))
      .pipe(
        map((transactionCRMS: ITransactionCRM[]) =>
          this.transactionCRMService.addTransactionCRMToCollectionIfMissing<ITransactionCRM>(
            transactionCRMS,
            this.markStHistory?.transactionCRM
          )
        )
      )
      .subscribe((transactionCRMS: ITransactionCRM[]) => (this.transactionCRMSSharedCollection = transactionCRMS));

    this.transactionEtapeService
      .query()
      .pipe(map((res: HttpResponse<ITransactionEtape[]>) => res.body ?? []))
      .pipe(
        map((transactionEtapes: ITransactionEtape[]) =>
          this.transactionEtapeService.addTransactionEtapeToCollectionIfMissing<ITransactionEtape>(
            transactionEtapes,
            this.markStHistory?.trEtape
          )
        )
      )
      .subscribe((transactionEtapes: ITransactionEtape[]) => (this.transactionEtapesSharedCollection = transactionEtapes));
  }
}
