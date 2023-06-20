import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrmPermission, NewCrmPermission } from '../crm-permission.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrmPermission for edit and NewCrmPermissionFormGroupInput for create.
 */
type CrmPermissionFormGroupInput = ICrmPermission | PartialWithRequiredKeyOf<NewCrmPermission>;

type CrmPermissionFormDefaults = Pick<NewCrmPermission, 'id' | 'crmRoles' | 'employees'>;

type CrmPermissionFormGroupContent = {
  id: FormControl<ICrmPermission['id'] | NewCrmPermission['id']>;
  pName: FormControl<ICrmPermission['pName']>;
  pDescription: FormControl<ICrmPermission['pDescription']>;
  crmRoles: FormControl<ICrmPermission['crmRoles']>;
  employees: FormControl<ICrmPermission['employees']>;
};

export type CrmPermissionFormGroup = FormGroup<CrmPermissionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrmPermissionFormService {
  createCrmPermissionFormGroup(crmPermission: CrmPermissionFormGroupInput = { id: null }): CrmPermissionFormGroup {
    const crmPermissionRawValue = {
      ...this.getFormDefaults(),
      ...crmPermission,
    };
    return new FormGroup<CrmPermissionFormGroupContent>({
      id: new FormControl(
        { value: crmPermissionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      pName: new FormControl(crmPermissionRawValue.pName),
      pDescription: new FormControl(crmPermissionRawValue.pDescription),
      crmRoles: new FormControl(crmPermissionRawValue.crmRoles ?? []),
      employees: new FormControl(crmPermissionRawValue.employees ?? []),
    });
  }

  getCrmPermission(form: CrmPermissionFormGroup): ICrmPermission | NewCrmPermission {
    return form.getRawValue() as ICrmPermission | NewCrmPermission;
  }

  resetForm(form: CrmPermissionFormGroup, crmPermission: CrmPermissionFormGroupInput): void {
    const crmPermissionRawValue = { ...this.getFormDefaults(), ...crmPermission };
    form.reset(
      {
        ...crmPermissionRawValue,
        id: { value: crmPermissionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrmPermissionFormDefaults {
    return {
      id: null,
      crmRoles: [],
      employees: [],
    };
  }
}
