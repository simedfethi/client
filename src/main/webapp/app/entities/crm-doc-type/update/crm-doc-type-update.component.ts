import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrmDocTypeFormService, CrmDocTypeFormGroup } from './crm-doc-type-form.service';
import { ICrmDocType } from '../crm-doc-type.model';
import { CrmDocTypeService } from '../service/crm-doc-type.service';

@Component({
  selector: 'jhi-crm-doc-type-update',
  templateUrl: './crm-doc-type-update.component.html',
})
export class CrmDocTypeUpdateComponent implements OnInit {
  isSaving = false;
  crmDocType: ICrmDocType | null = null;

  editForm: CrmDocTypeFormGroup = this.crmDocTypeFormService.createCrmDocTypeFormGroup();

  constructor(
    protected crmDocTypeService: CrmDocTypeService,
    protected crmDocTypeFormService: CrmDocTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmDocType }) => {
      this.crmDocType = crmDocType;
      if (crmDocType) {
        this.updateForm(crmDocType);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crmDocType = this.crmDocTypeFormService.getCrmDocType(this.editForm);
    if (crmDocType.id !== null) {
      this.subscribeToSaveResponse(this.crmDocTypeService.update(crmDocType));
    } else {
      this.subscribeToSaveResponse(this.crmDocTypeService.create(crmDocType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrmDocType>>): void {
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

  protected updateForm(crmDocType: ICrmDocType): void {
    this.crmDocType = crmDocType;
    this.crmDocTypeFormService.resetForm(this.editForm, crmDocType);
  }
}
