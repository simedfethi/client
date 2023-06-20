import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrmSettingFormService, CrmSettingFormGroup } from './crm-setting-form.service';
import { ICrmSetting } from '../crm-setting.model';
import { CrmSettingService } from '../service/crm-setting.service';

@Component({
  selector: 'jhi-crm-setting-update',
  templateUrl: './crm-setting-update.component.html',
})
export class CrmSettingUpdateComponent implements OnInit {
  isSaving = false;
  crmSetting: ICrmSetting | null = null;

  editForm: CrmSettingFormGroup = this.crmSettingFormService.createCrmSettingFormGroup();

  constructor(
    protected crmSettingService: CrmSettingService,
    protected crmSettingFormService: CrmSettingFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmSetting }) => {
      this.crmSetting = crmSetting;
      if (crmSetting) {
        this.updateForm(crmSetting);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crmSetting = this.crmSettingFormService.getCrmSetting(this.editForm);
    if (crmSetting.id !== null) {
      this.subscribeToSaveResponse(this.crmSettingService.update(crmSetting));
    } else {
      this.subscribeToSaveResponse(this.crmSettingService.create(crmSetting));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrmSetting>>): void {
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

  protected updateForm(crmSetting: ICrmSetting): void {
    this.crmSetting = crmSetting;
    this.crmSettingFormService.resetForm(this.editForm, crmSetting);
  }
}
