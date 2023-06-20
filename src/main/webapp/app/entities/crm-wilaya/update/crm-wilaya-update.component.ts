import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CrmWilayaFormService, CrmWilayaFormGroup } from './crm-wilaya-form.service';
import { ICrmWilaya } from '../crm-wilaya.model';
import { CrmWilayaService } from '../service/crm-wilaya.service';
import { ICrmCountry } from 'app/entities/crm-country/crm-country.model';
import { CrmCountryService } from 'app/entities/crm-country/service/crm-country.service';

@Component({
  selector: 'jhi-crm-wilaya-update',
  templateUrl: './crm-wilaya-update.component.html',
})
export class CrmWilayaUpdateComponent implements OnInit {
  isSaving = false;
  crmWilaya: ICrmWilaya | null = null;

  crmCountriesSharedCollection: ICrmCountry[] = [];

  editForm: CrmWilayaFormGroup = this.crmWilayaFormService.createCrmWilayaFormGroup();

  constructor(
    protected crmWilayaService: CrmWilayaService,
    protected crmWilayaFormService: CrmWilayaFormService,
    protected crmCountryService: CrmCountryService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCrmCountry = (o1: ICrmCountry | null, o2: ICrmCountry | null): boolean => this.crmCountryService.compareCrmCountry(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmWilaya }) => {
      this.crmWilaya = crmWilaya;
      if (crmWilaya) {
        this.updateForm(crmWilaya);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crmWilaya = this.crmWilayaFormService.getCrmWilaya(this.editForm);
    if (crmWilaya.id !== null) {
      this.subscribeToSaveResponse(this.crmWilayaService.update(crmWilaya));
    } else {
      this.subscribeToSaveResponse(this.crmWilayaService.create(crmWilaya));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrmWilaya>>): void {
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

  protected updateForm(crmWilaya: ICrmWilaya): void {
    this.crmWilaya = crmWilaya;
    this.crmWilayaFormService.resetForm(this.editForm, crmWilaya);

    this.crmCountriesSharedCollection = this.crmCountryService.addCrmCountryToCollectionIfMissing<ICrmCountry>(
      this.crmCountriesSharedCollection,
      crmWilaya.crmCountry
    );
  }

  protected loadRelationshipsOptions(): void {
    this.crmCountryService
      .query()
      .pipe(map((res: HttpResponse<ICrmCountry[]>) => res.body ?? []))
      .pipe(
        map((crmCountries: ICrmCountry[]) =>
          this.crmCountryService.addCrmCountryToCollectionIfMissing<ICrmCountry>(crmCountries, this.crmWilaya?.crmCountry)
        )
      )
      .subscribe((crmCountries: ICrmCountry[]) => (this.crmCountriesSharedCollection = crmCountries));
  }
}
