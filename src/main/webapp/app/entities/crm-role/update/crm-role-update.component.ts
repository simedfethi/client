import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrmRoleFormService, CrmRoleFormGroup } from './crm-role-form.service';
import { ICrmRole } from '../crm-role.model';
import { CrmRoleService } from '../service/crm-role.service';

@Component({
  selector: 'jhi-crm-role-update',
  templateUrl: './crm-role-update.component.html',
})
export class CrmRoleUpdateComponent implements OnInit {
  isSaving = false;
  crmRole: ICrmRole | null = null;

  editForm: CrmRoleFormGroup = this.crmRoleFormService.createCrmRoleFormGroup();

  constructor(
    protected crmRoleService: CrmRoleService,
    protected crmRoleFormService: CrmRoleFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmRole }) => {
      this.crmRole = crmRole;
      if (crmRole) {
        this.updateForm(crmRole);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crmRole = this.crmRoleFormService.getCrmRole(this.editForm);
    if (crmRole.id !== null) {
      this.subscribeToSaveResponse(this.crmRoleService.update(crmRole));
    } else {
      this.subscribeToSaveResponse(this.crmRoleService.create(crmRole));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrmRole>>): void {
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

  protected updateForm(crmRole: ICrmRole): void {
    this.crmRole = crmRole;
    this.crmRoleFormService.resetForm(this.editForm, crmRole);
  }
}
