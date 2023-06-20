import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrmCommune, NewCrmCommune } from '../crm-commune.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrmCommune for edit and NewCrmCommuneFormGroupInput for create.
 */
type CrmCommuneFormGroupInput = ICrmCommune | PartialWithRequiredKeyOf<NewCrmCommune>;

type CrmCommuneFormDefaults = Pick<NewCrmCommune, 'id'>;

type CrmCommuneFormGroupContent = {
  id: FormControl<ICrmCommune['id'] | NewCrmCommune['id']>;
  communeName: FormControl<ICrmCommune['communeName']>;
  crmDaira: FormControl<ICrmCommune['crmDaira']>;
};

export type CrmCommuneFormGroup = FormGroup<CrmCommuneFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrmCommuneFormService {
  createCrmCommuneFormGroup(crmCommune: CrmCommuneFormGroupInput = { id: null }): CrmCommuneFormGroup {
    const crmCommuneRawValue = {
      ...this.getFormDefaults(),
      ...crmCommune,
    };
    return new FormGroup<CrmCommuneFormGroupContent>({
      id: new FormControl(
        { value: crmCommuneRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      communeName: new FormControl(crmCommuneRawValue.communeName),
      crmDaira: new FormControl(crmCommuneRawValue.crmDaira),
    });
  }

  getCrmCommune(form: CrmCommuneFormGroup): ICrmCommune | NewCrmCommune {
    return form.getRawValue() as ICrmCommune | NewCrmCommune;
  }

  resetForm(form: CrmCommuneFormGroup, crmCommune: CrmCommuneFormGroupInput): void {
    const crmCommuneRawValue = { ...this.getFormDefaults(), ...crmCommune };
    form.reset(
      {
        ...crmCommuneRawValue,
        id: { value: crmCommuneRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrmCommuneFormDefaults {
    return {
      id: null,
    };
  }
}
