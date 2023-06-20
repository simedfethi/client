import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrmSetting, NewCrmSetting } from '../crm-setting.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrmSetting for edit and NewCrmSettingFormGroupInput for create.
 */
type CrmSettingFormGroupInput = ICrmSetting | PartialWithRequiredKeyOf<NewCrmSetting>;

type CrmSettingFormDefaults = Pick<NewCrmSetting, 'id'>;

type CrmSettingFormGroupContent = {
  id: FormControl<ICrmSetting['id'] | NewCrmSetting['id']>;
  stName: FormControl<ICrmSetting['stName']>;
  stValue: FormControl<ICrmSetting['stValue']>;
};

export type CrmSettingFormGroup = FormGroup<CrmSettingFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrmSettingFormService {
  createCrmSettingFormGroup(crmSetting: CrmSettingFormGroupInput = { id: null }): CrmSettingFormGroup {
    const crmSettingRawValue = {
      ...this.getFormDefaults(),
      ...crmSetting,
    };
    return new FormGroup<CrmSettingFormGroupContent>({
      id: new FormControl(
        { value: crmSettingRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      stName: new FormControl(crmSettingRawValue.stName),
      stValue: new FormControl(crmSettingRawValue.stValue),
    });
  }

  getCrmSetting(form: CrmSettingFormGroup): ICrmSetting | NewCrmSetting {
    return form.getRawValue() as ICrmSetting | NewCrmSetting;
  }

  resetForm(form: CrmSettingFormGroup, crmSetting: CrmSettingFormGroupInput): void {
    const crmSettingRawValue = { ...this.getFormDefaults(), ...crmSetting };
    form.reset(
      {
        ...crmSettingRawValue,
        id: { value: crmSettingRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrmSettingFormDefaults {
    return {
      id: null,
    };
  }
}
