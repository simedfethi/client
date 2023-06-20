import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CrmCommuneFormService, CrmCommuneFormGroup } from './crm-commune-form.service';
import { ICrmCommune } from '../crm-commune.model';
import { CrmCommuneService } from '../service/crm-commune.service';
import { ICrmDaira } from 'app/entities/crm-daira/crm-daira.model';
import { CrmDairaService } from 'app/entities/crm-daira/service/crm-daira.service';

@Component({
  selector: 'jhi-crm-commune-update',
  templateUrl: './crm-commune-update.component.html',
})
export class CrmCommuneUpdateComponent implements OnInit {
  isSaving = false;
  crmCommune: ICrmCommune | null = null;

  crmDairasSharedCollection: ICrmDaira[] = [];

  editForm: CrmCommuneFormGroup = this.crmCommuneFormService.createCrmCommuneFormGroup();

  constructor(
    protected crmCommuneService: CrmCommuneService,
    protected crmCommuneFormService: CrmCommuneFormService,
    protected crmDairaService: CrmDairaService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCrmDaira = (o1: ICrmDaira | null, o2: ICrmDaira | null): boolean => this.crmDairaService.compareCrmDaira(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmCommune }) => {
      this.crmCommune = crmCommune;
      if (crmCommune) {
        this.updateForm(crmCommune);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crmCommune = this.crmCommuneFormService.getCrmCommune(this.editForm);
    if (crmCommune.id !== null) {
      this.subscribeToSaveResponse(this.crmCommuneService.update(crmCommune));
    } else {
      this.subscribeToSaveResponse(this.crmCommuneService.create(crmCommune));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrmCommune>>): void {
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

  protected updateForm(crmCommune: ICrmCommune): void {
    this.crmCommune = crmCommune;
    this.crmCommuneFormService.resetForm(this.editForm, crmCommune);

    this.crmDairasSharedCollection = this.crmDairaService.addCrmDairaToCollectionIfMissing<ICrmDaira>(
      this.crmDairasSharedCollection,
      crmCommune.crmDaira
    );
  }

  protected loadRelationshipsOptions(): void {
    this.crmDairaService
      .query()
      .pipe(map((res: HttpResponse<ICrmDaira[]>) => res.body ?? []))
      .pipe(
        map((crmDairas: ICrmDaira[]) =>
          this.crmDairaService.addCrmDairaToCollectionIfMissing<ICrmDaira>(crmDairas, this.crmCommune?.crmDaira)
        )
      )
      .subscribe((crmDairas: ICrmDaira[]) => (this.crmDairasSharedCollection = crmDairas));
  }
}
