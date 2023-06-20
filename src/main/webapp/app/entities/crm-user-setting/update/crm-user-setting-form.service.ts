import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrmUserSetting, NewCrmUserSetting } from '../crm-user-setting.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrmUserSetting for edit and NewCrmUserSettingFormGroupInput for create.
 */
type CrmUserSettingFormGroupInput = ICrmUserSetting | PartialWithRequiredKeyOf<NewCrmUserSetting>;

type CrmUserSettingFormDefaults = Pick<NewCrmUserSetting, 'id' | 'employees'>;

type CrmUserSettingFormGroupContent = {
  id: FormControl<ICrmUserSetting['id'] | NewCrmUserSetting['id']>;
  stName: FormControl<ICrmUserSetting['stName']>;
  stValue: FormControl<ICrmUserSetting['stValue']>;
  employees: FormControl<ICrmUserSetting['employees']>;
};

export type CrmUserSettingFormGroup = FormGroup<CrmUserSettingFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrmUserSettingFormService {
  createCrmUserSettingFormGroup(crmUserSetting: CrmUserSettingFormGroupInput = { id: null }): CrmUserSettingFormGroup {
    const crmUserSettingRawValue = {
      ...this.getFormDefaults(),
      ...crmUserSetting,
    };
    return new FormGroup<CrmUserSettingFormGroupContent>({
      id: new FormControl(
        { value: crmUserSettingRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      stName: new FormControl(crmUserSettingRawValue.stName),
      stValue: new FormControl(crmUserSettingRawValue.stValue),
      employees: new FormControl(crmUserSettingRawValue.employees ?? []),
    });
  }

  getCrmUserSetting(form: CrmUserSettingFormGroup): ICrmUserSetting | NewCrmUserSetting {
    return form.getRawValue() as ICrmUserSetting | NewCrmUserSetting;
  }

  resetForm(form: CrmUserSettingFormGroup, crmUserSetting: CrmUserSettingFormGroupInput): void {
    const crmUserSettingRawValue = { ...this.getFormDefaults(), ...crmUserSetting };
    form.reset(
      {
        ...crmUserSettingRawValue,
        id: { value: crmUserSettingRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrmUserSettingFormDefaults {
    return {
      id: null,
      employees: [],
    };
  }
}
