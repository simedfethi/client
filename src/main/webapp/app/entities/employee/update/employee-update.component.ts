import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { EmployeeFormService, EmployeeFormGroup } from './employee-form.service';
import { IEmployee } from '../employee.model';
import { EmployeeService } from '../service/employee.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IDepartement } from 'app/entities/departement/departement.model';
import { DepartementService } from 'app/entities/departement/service/departement.service';
import { ICrmUserSetting } from 'app/entities/crm-user-setting/crm-user-setting.model';
import { CrmUserSettingService } from 'app/entities/crm-user-setting/service/crm-user-setting.service';
import { ICrmPermission } from 'app/entities/crm-permission/crm-permission.model';
import { CrmPermissionService } from 'app/entities/crm-permission/service/crm-permission.service';
import { Gender } from 'app/entities/enumerations/gender.model';

@Component({
  selector: 'jhi-employee-update',
  templateUrl: './employee-update.component.html',
})
export class EmployeeUpdateComponent implements OnInit {
  isSaving = false;
  employee: IEmployee | null = null;
  genderValues = Object.keys(Gender);

  usersSharedCollection: IUser[] = [];
  departementsSharedCollection: IDepartement[] = [];
  crmUserSettingsSharedCollection: ICrmUserSetting[] = [];
  crmPermissionsSharedCollection: ICrmPermission[] = [];

  editForm: EmployeeFormGroup = this.employeeFormService.createEmployeeFormGroup();

  constructor(
    protected employeeService: EmployeeService,
    protected employeeFormService: EmployeeFormService,
    protected userService: UserService,
    protected departementService: DepartementService,
    protected crmUserSettingService: CrmUserSettingService,
    protected crmPermissionService: CrmPermissionService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  compareDepartement = (o1: IDepartement | null, o2: IDepartement | null): boolean => this.departementService.compareDepartement(o1, o2);

  compareCrmUserSetting = (o1: ICrmUserSetting | null, o2: ICrmUserSetting | null): boolean =>
    this.crmUserSettingService.compareCrmUserSetting(o1, o2);

  compareCrmPermission = (o1: ICrmPermission | null, o2: ICrmPermission | null): boolean =>
    this.crmPermissionService.compareCrmPermission(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employee }) => {
      this.employee = employee;
      if (employee) {
        this.updateForm(employee);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employee = this.employeeFormService.getEmployee(this.editForm);
    if (employee.id !== null) {
      this.subscribeToSaveResponse(this.employeeService.update(employee));
    } else {
      this.subscribeToSaveResponse(this.employeeService.create(employee));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployee>>): void {
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

  protected updateForm(employee: IEmployee): void {
    this.employee = employee;
    this.employeeFormService.resetForm(this.editForm, employee);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, employee.utilisateur);
    this.departementsSharedCollection = this.departementService.addDepartementToCollectionIfMissing<IDepartement>(
      this.departementsSharedCollection,
      employee.departement
    );
    this.crmUserSettingsSharedCollection = this.crmUserSettingService.addCrmUserSettingToCollectionIfMissing<ICrmUserSetting>(
      this.crmUserSettingsSharedCollection,
      ...(employee.crmUserSettings ?? [])
    );
    this.crmPermissionsSharedCollection = this.crmPermissionService.addCrmPermissionToCollectionIfMissing<ICrmPermission>(
      this.crmPermissionsSharedCollection,
      ...(employee.crmPermissions ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.employee?.utilisateur)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.departementService
      .query()
      .pipe(map((res: HttpResponse<IDepartement[]>) => res.body ?? []))
      .pipe(
        map((departements: IDepartement[]) =>
          this.departementService.addDepartementToCollectionIfMissing<IDepartement>(departements, this.employee?.departement)
        )
      )
      .subscribe((departements: IDepartement[]) => (this.departementsSharedCollection = departements));

    this.crmUserSettingService
      .query()
      .pipe(map((res: HttpResponse<ICrmUserSetting[]>) => res.body ?? []))
      .pipe(
        map((crmUserSettings: ICrmUserSetting[]) =>
          this.crmUserSettingService.addCrmUserSettingToCollectionIfMissing<ICrmUserSetting>(
            crmUserSettings,
            ...(this.employee?.crmUserSettings ?? [])
          )
        )
      )
      .subscribe((crmUserSettings: ICrmUserSetting[]) => (this.crmUserSettingsSharedCollection = crmUserSettings));

    this.crmPermissionService
      .query()
      .pipe(map((res: HttpResponse<ICrmPermission[]>) => res.body ?? []))
      .pipe(
        map((crmPermissions: ICrmPermission[]) =>
          this.crmPermissionService.addCrmPermissionToCollectionIfMissing<ICrmPermission>(
            crmPermissions,
            ...(this.employee?.crmPermissions ?? [])
          )
        )
      )
      .subscribe((crmPermissions: ICrmPermission[]) => (this.crmPermissionsSharedCollection = crmPermissions));
  }
}
