import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CrmPermissionFormService, CrmPermissionFormGroup } from './crm-permission-form.service';
import { ICrmPermission } from '../crm-permission.model';
import { CrmPermissionService } from '../service/crm-permission.service';
import { ICrmRole } from 'app/entities/crm-role/crm-role.model';
import { CrmRoleService } from 'app/entities/crm-role/service/crm-role.service';

@Component({
  selector: 'jhi-crm-permission-update',
  templateUrl: './crm-permission-update.component.html',
})
export class CrmPermissionUpdateComponent implements OnInit {
  isSaving = false;
  crmPermission: ICrmPermission | null = null;

  crmRolesSharedCollection: ICrmRole[] = [];

  editForm: CrmPermissionFormGroup = this.crmPermissionFormService.createCrmPermissionFormGroup();

  constructor(
    protected crmPermissionService: CrmPermissionService,
    protected crmPermissionFormService: CrmPermissionFormService,
    protected crmRoleService: CrmRoleService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCrmRole = (o1: ICrmRole | null, o2: ICrmRole | null): boolean => this.crmRoleService.compareCrmRole(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmPermission }) => {
      this.crmPermission = crmPermission;
      if (crmPermission) {
        this.updateForm(crmPermission);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crmPermission = this.crmPermissionFormService.getCrmPermission(this.editForm);
    if (crmPermission.id !== null) {
      this.subscribeToSaveResponse(this.crmPermissionService.update(crmPermission));
    } else {
      this.subscribeToSaveResponse(this.crmPermissionService.create(crmPermission));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrmPermission>>): void {
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

  protected updateForm(crmPermission: ICrmPermission): void {
    this.crmPermission = crmPermission;
    this.crmPermissionFormService.resetForm(this.editForm, crmPermission);

    this.crmRolesSharedCollection = this.crmRoleService.addCrmRoleToCollectionIfMissing<ICrmRole>(
      this.crmRolesSharedCollection,
      ...(crmPermission.crmRoles ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.crmRoleService
      .query()
      .pipe(map((res: HttpResponse<ICrmRole[]>) => res.body ?? []))
      .pipe(
        map((crmRoles: ICrmRole[]) =>
          this.crmRoleService.addCrmRoleToCollectionIfMissing<ICrmRole>(crmRoles, ...(this.crmPermission?.crmRoles ?? []))
        )
      )
      .subscribe((crmRoles: ICrmRole[]) => (this.crmRolesSharedCollection = crmRoles));
  }
}
