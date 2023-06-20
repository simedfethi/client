import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { EmployerNumberFormService, EmployerNumberFormGroup } from './employer-number-form.service';
import { IEmployerNumber } from '../employer-number.model';
import { EmployerNumberService } from '../service/employer-number.service';

@Component({
  selector: 'jhi-employer-number-update',
  templateUrl: './employer-number-update.component.html',
})
export class EmployerNumberUpdateComponent implements OnInit {
  isSaving = false;
  employerNumber: IEmployerNumber | null = null;

  editForm: EmployerNumberFormGroup = this.employerNumberFormService.createEmployerNumberFormGroup();

  constructor(
    protected employerNumberService: EmployerNumberService,
    protected employerNumberFormService: EmployerNumberFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employerNumber }) => {
      this.employerNumber = employerNumber;
      if (employerNumber) {
        this.updateForm(employerNumber);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employerNumber = this.employerNumberFormService.getEmployerNumber(this.editForm);
    if (employerNumber.id !== null) {
      this.subscribeToSaveResponse(this.employerNumberService.update(employerNumber));
    } else {
      this.subscribeToSaveResponse(this.employerNumberService.create(employerNumber));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployerNumber>>): void {
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

  protected updateForm(employerNumber: IEmployerNumber): void {
    this.employerNumber = employerNumber;
    this.employerNumberFormService.resetForm(this.editForm, employerNumber);
  }
}
