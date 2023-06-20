import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrmCountryFormService, CrmCountryFormGroup } from './crm-country-form.service';
import { ICrmCountry } from '../crm-country.model';
import { CrmCountryService } from '../service/crm-country.service';

@Component({
  selector: 'jhi-crm-country-update',
  templateUrl: './crm-country-update.component.html',
})
export class CrmCountryUpdateComponent implements OnInit {
  isSaving = false;
  crmCountry: ICrmCountry | null = null;

  editForm: CrmCountryFormGroup = this.crmCountryFormService.createCrmCountryFormGroup();

  constructor(
    protected crmCountryService: CrmCountryService,
    protected crmCountryFormService: CrmCountryFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmCountry }) => {
      this.crmCountry = crmCountry;
      if (crmCountry) {
        this.updateForm(crmCountry);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crmCountry = this.crmCountryFormService.getCrmCountry(this.editForm);
    if (crmCountry.id !== null) {
      this.subscribeToSaveResponse(this.crmCountryService.update(crmCountry));
    } else {
      this.subscribeToSaveResponse(this.crmCountryService.create(crmCountry));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrmCountry>>): void {
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

  protected updateForm(crmCountry: ICrmCountry): void {
    this.crmCountry = crmCountry;
    this.crmCountryFormService.resetForm(this.editForm, crmCountry);
  }
}
