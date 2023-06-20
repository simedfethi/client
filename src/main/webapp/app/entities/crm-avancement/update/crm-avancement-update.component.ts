import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrmAvancementFormService, CrmAvancementFormGroup } from './crm-avancement-form.service';
import { ICrmAvancement } from '../crm-avancement.model';
import { CrmAvancementService } from '../service/crm-avancement.service';

@Component({
  selector: 'jhi-crm-avancement-update',
  templateUrl: './crm-avancement-update.component.html',
})
export class CrmAvancementUpdateComponent implements OnInit {
  isSaving = false;
  crmAvancement: ICrmAvancement | null = null;

  editForm: CrmAvancementFormGroup = this.crmAvancementFormService.createCrmAvancementFormGroup();

  constructor(
    protected crmAvancementService: CrmAvancementService,
    protected crmAvancementFormService: CrmAvancementFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmAvancement }) => {
      this.crmAvancement = crmAvancement;
      if (crmAvancement) {
        this.updateForm(crmAvancement);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crmAvancement = this.crmAvancementFormService.getCrmAvancement(this.editForm);
    if (crmAvancement.id !== null) {
      this.subscribeToSaveResponse(this.crmAvancementService.update(crmAvancement));
    } else {
      this.subscribeToSaveResponse(this.crmAvancementService.create(crmAvancement));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrmAvancement>>): void {
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

  protected updateForm(crmAvancement: ICrmAvancement): void {
    this.crmAvancement = crmAvancement;
    this.crmAvancementFormService.resetForm(this.editForm, crmAvancement);
  }
}
