import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CrmDairaFormService, CrmDairaFormGroup } from './crm-daira-form.service';
import { ICrmDaira } from '../crm-daira.model';
import { CrmDairaService } from '../service/crm-daira.service';
import { ICrmWilaya } from 'app/entities/crm-wilaya/crm-wilaya.model';
import { CrmWilayaService } from 'app/entities/crm-wilaya/service/crm-wilaya.service';

@Component({
  selector: 'jhi-crm-daira-update',
  templateUrl: './crm-daira-update.component.html',
})
export class CrmDairaUpdateComponent implements OnInit {
  isSaving = false;
  crmDaira: ICrmDaira | null = null;

  crmWilayasSharedCollection: ICrmWilaya[] = [];

  editForm: CrmDairaFormGroup = this.crmDairaFormService.createCrmDairaFormGroup();

  constructor(
    protected crmDairaService: CrmDairaService,
    protected crmDairaFormService: CrmDairaFormService,
    protected crmWilayaService: CrmWilayaService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCrmWilaya = (o1: ICrmWilaya | null, o2: ICrmWilaya | null): boolean => this.crmWilayaService.compareCrmWilaya(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmDaira }) => {
      this.crmDaira = crmDaira;
      if (crmDaira) {
        this.updateForm(crmDaira);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crmDaira = this.crmDairaFormService.getCrmDaira(this.editForm);
    if (crmDaira.id !== null) {
      this.subscribeToSaveResponse(this.crmDairaService.update(crmDaira));
    } else {
      this.subscribeToSaveResponse(this.crmDairaService.create(crmDaira));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrmDaira>>): void {
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

  protected updateForm(crmDaira: ICrmDaira): void {
    this.crmDaira = crmDaira;
    this.crmDairaFormService.resetForm(this.editForm, crmDaira);

    this.crmWilayasSharedCollection = this.crmWilayaService.addCrmWilayaToCollectionIfMissing<ICrmWilaya>(
      this.crmWilayasSharedCollection,
      crmDaira.crmWilaya
    );
  }

  protected loadRelationshipsOptions(): void {
    this.crmWilayaService
      .query()
      .pipe(map((res: HttpResponse<ICrmWilaya[]>) => res.body ?? []))
      .pipe(
        map((crmWilayas: ICrmWilaya[]) =>
          this.crmWilayaService.addCrmWilayaToCollectionIfMissing<ICrmWilaya>(crmWilayas, this.crmDaira?.crmWilaya)
        )
      )
      .subscribe((crmWilayas: ICrmWilaya[]) => (this.crmWilayasSharedCollection = crmWilayas));
  }
}
