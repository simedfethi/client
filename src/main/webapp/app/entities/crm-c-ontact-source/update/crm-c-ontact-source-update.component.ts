import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrmCOntactSourceFormService, CrmCOntactSourceFormGroup } from './crm-c-ontact-source-form.service';
import { ICrmCOntactSource } from '../crm-c-ontact-source.model';
import { CrmCOntactSourceService } from '../service/crm-c-ontact-source.service';

@Component({
  selector: 'jhi-crm-c-ontact-source-update',
  templateUrl: './crm-c-ontact-source-update.component.html',
})
export class CrmCOntactSourceUpdateComponent implements OnInit {
  isSaving = false;
  crmCOntactSource: ICrmCOntactSource | null = null;

  editForm: CrmCOntactSourceFormGroup = this.crmCOntactSourceFormService.createCrmCOntactSourceFormGroup();

  constructor(
    protected crmCOntactSourceService: CrmCOntactSourceService,
    protected crmCOntactSourceFormService: CrmCOntactSourceFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmCOntactSource }) => {
      this.crmCOntactSource = crmCOntactSource;
      if (crmCOntactSource) {
        this.updateForm(crmCOntactSource);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crmCOntactSource = this.crmCOntactSourceFormService.getCrmCOntactSource(this.editForm);
    if (crmCOntactSource.id !== null) {
      this.subscribeToSaveResponse(this.crmCOntactSourceService.update(crmCOntactSource));
    } else {
      this.subscribeToSaveResponse(this.crmCOntactSourceService.create(crmCOntactSource));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrmCOntactSource>>): void {
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

  protected updateForm(crmCOntactSource: ICrmCOntactSource): void {
    this.crmCOntactSource = crmCOntactSource;
    this.crmCOntactSourceFormService.resetForm(this.editForm, crmCOntactSource);
  }
}
