import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrmAvancement, NewCrmAvancement } from '../crm-avancement.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrmAvancement for edit and NewCrmAvancementFormGroupInput for create.
 */
type CrmAvancementFormGroupInput = ICrmAvancement | PartialWithRequiredKeyOf<NewCrmAvancement>;

type CrmAvancementFormDefaults = Pick<NewCrmAvancement, 'id'>;

type CrmAvancementFormGroupContent = {
  id: FormControl<ICrmAvancement['id'] | NewCrmAvancement['id']>;
  avanName: FormControl<ICrmAvancement['avanName']>;
};

export type CrmAvancementFormGroup = FormGroup<CrmAvancementFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrmAvancementFormService {
  createCrmAvancementFormGroup(crmAvancement: CrmAvancementFormGroupInput = { id: null }): CrmAvancementFormGroup {
    const crmAvancementRawValue = {
      ...this.getFormDefaults(),
      ...crmAvancement,
    };
    return new FormGroup<CrmAvancementFormGroupContent>({
      id: new FormControl(
        { value: crmAvancementRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      avanName: new FormControl(crmAvancementRawValue.avanName),
    });
  }

  getCrmAvancement(form: CrmAvancementFormGroup): ICrmAvancement | NewCrmAvancement {
    return form.getRawValue() as ICrmAvancement | NewCrmAvancement;
  }

  resetForm(form: CrmAvancementFormGroup, crmAvancement: CrmAvancementFormGroupInput): void {
    const crmAvancementRawValue = { ...this.getFormDefaults(), ...crmAvancement };
    form.reset(
      {
        ...crmAvancementRawValue,
        id: { value: crmAvancementRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrmAvancementFormDefaults {
    return {
      id: null,
    };
  }
}
