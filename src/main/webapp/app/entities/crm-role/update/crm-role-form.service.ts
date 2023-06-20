import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrmRole, NewCrmRole } from '../crm-role.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrmRole for edit and NewCrmRoleFormGroupInput for create.
 */
type CrmRoleFormGroupInput = ICrmRole | PartialWithRequiredKeyOf<NewCrmRole>;

type CrmRoleFormDefaults = Pick<NewCrmRole, 'id' | 'crmPermissions'>;

type CrmRoleFormGroupContent = {
  id: FormControl<ICrmRole['id'] | NewCrmRole['id']>;
  roleName: FormControl<ICrmRole['roleName']>;
  roleCode: FormControl<ICrmRole['roleCode']>;
  roleDescription: FormControl<ICrmRole['roleDescription']>;
  crmPermissions: FormControl<ICrmRole['crmPermissions']>;
};

export type CrmRoleFormGroup = FormGroup<CrmRoleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrmRoleFormService {
  createCrmRoleFormGroup(crmRole: CrmRoleFormGroupInput = { id: null }): CrmRoleFormGroup {
    const crmRoleRawValue = {
      ...this.getFormDefaults(),
      ...crmRole,
    };
    return new FormGroup<CrmRoleFormGroupContent>({
      id: new FormControl(
        { value: crmRoleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      roleName: new FormControl(crmRoleRawValue.roleName),
      roleCode: new FormControl(crmRoleRawValue.roleCode),
      roleDescription: new FormControl(crmRoleRawValue.roleDescription),
      crmPermissions: new FormControl(crmRoleRawValue.crmPermissions ?? []),
    });
  }

  getCrmRole(form: CrmRoleFormGroup): ICrmRole | NewCrmRole {
    return form.getRawValue() as ICrmRole | NewCrmRole;
  }

  resetForm(form: CrmRoleFormGroup, crmRole: CrmRoleFormGroupInput): void {
    const crmRoleRawValue = { ...this.getFormDefaults(), ...crmRole };
    form.reset(
      {
        ...crmRoleRawValue,
        id: { value: crmRoleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrmRoleFormDefaults {
    return {
      id: null,
      crmPermissions: [],
    };
  }
}
