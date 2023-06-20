import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrmUserSettingFormService, CrmUserSettingFormGroup } from './crm-user-setting-form.service';
import { ICrmUserSetting } from '../crm-user-setting.model';
import { CrmUserSettingService } from '../service/crm-user-setting.service';

@Component({
  selector: 'jhi-crm-user-setting-update',
  templateUrl: './crm-user-setting-update.component.html',
})
export class CrmUserSettingUpdateComponent implements OnInit {
  isSaving = false;
  crmUserSetting: ICrmUserSetting | null = null;

  editForm: CrmUserSettingFormGroup = this.crmUserSettingFormService.createCrmUserSettingFormGroup();

  constructor(
    protected crmUserSettingService: CrmUserSettingService,
    protected crmUserSettingFormService: CrmUserSettingFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmUserSetting }) => {
      this.crmUserSetting = crmUserSetting;
      if (crmUserSetting) {
        this.updateForm(crmUserSetting);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crmUserSetting = this.crmUserSettingFormService.getCrmUserSetting(this.editForm);
    if (crmUserSetting.id !== null) {
      this.subscribeToSaveResponse(this.crmUserSettingService.update(crmUserSetting));
    } else {
      this.subscribeToSaveResponse(this.crmUserSettingService.create(crmUserSetting));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrmUserSetting>>): void {
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

  protected updateForm(crmUserSetting: ICrmUserSetting): void {
    this.crmUserSetting = crmUserSetting;
    this.crmUserSettingFormService.resetForm(this.editForm, crmUserSetting);
  }
}
