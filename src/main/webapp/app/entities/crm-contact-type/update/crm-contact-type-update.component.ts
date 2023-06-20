import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrmContactTypeFormService, CrmContactTypeFormGroup } from './crm-contact-type-form.service';
import { ICrmContactType } from '../crm-contact-type.model';
import { CrmContactTypeService } from '../service/crm-contact-type.service';

@Component({
  selector: 'jhi-crm-contact-type-update',
  templateUrl: './crm-contact-type-update.component.html',
})
export class CrmContactTypeUpdateComponent implements OnInit {
  isSaving = false;
  crmContactType: ICrmContactType | null = null;

  editForm: CrmContactTypeFormGroup = this.crmContactTypeFormService.createCrmContactTypeFormGroup();

  constructor(
    protected crmContactTypeService: CrmContactTypeService,
    protected crmContactTypeFormService: CrmContactTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmContactType }) => {
      this.crmContactType = crmContactType;
      if (crmContactType) {
        this.updateForm(crmContactType);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crmContactType = this.crmContactTypeFormService.getCrmContactType(this.editForm);
    if (crmContactType.id !== null) {
      this.subscribeToSaveResponse(this.crmContactTypeService.update(crmContactType));
    } else {
      this.subscribeToSaveResponse(this.crmContactTypeService.create(crmContactType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrmContactType>>): void {
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

  protected updateForm(crmContactType: ICrmContactType): void {
    this.crmContactType = crmContactType;
    this.crmContactTypeFormService.resetForm(this.editForm, crmContactType);
  }
}
