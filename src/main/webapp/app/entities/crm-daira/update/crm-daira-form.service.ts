import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrmDaira, NewCrmDaira } from '../crm-daira.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrmDaira for edit and NewCrmDairaFormGroupInput for create.
 */
type CrmDairaFormGroupInput = ICrmDaira | PartialWithRequiredKeyOf<NewCrmDaira>;

type CrmDairaFormDefaults = Pick<NewCrmDaira, 'id'>;

type CrmDairaFormGroupContent = {
  id: FormControl<ICrmDaira['id'] | NewCrmDaira['id']>;
  dairaName: FormControl<ICrmDaira['dairaName']>;
  crmWilaya: FormControl<ICrmDaira['crmWilaya']>;
};

export type CrmDairaFormGroup = FormGroup<CrmDairaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrmDairaFormService {
  createCrmDairaFormGroup(crmDaira: CrmDairaFormGroupInput = { id: null }): CrmDairaFormGroup {
    const crmDairaRawValue = {
      ...this.getFormDefaults(),
      ...crmDaira,
    };
    return new FormGroup<CrmDairaFormGroupContent>({
      id: new FormControl(
        { value: crmDairaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      dairaName: new FormControl(crmDairaRawValue.dairaName),
      crmWilaya: new FormControl(crmDairaRawValue.crmWilaya),
    });
  }

  getCrmDaira(form: CrmDairaFormGroup): ICrmDaira | NewCrmDaira {
    return form.getRawValue() as ICrmDaira | NewCrmDaira;
  }

  resetForm(form: CrmDairaFormGroup, crmDaira: CrmDairaFormGroupInput): void {
    const crmDairaRawValue = { ...this.getFormDefaults(), ...crmDaira };
    form.reset(
      {
        ...crmDairaRawValue,
        id: { value: crmDairaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrmDairaFormDefaults {
    return {
      id: null,
    };
  }
}
