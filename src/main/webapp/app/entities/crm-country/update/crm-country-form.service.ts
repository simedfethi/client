import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrmCountry, NewCrmCountry } from '../crm-country.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrmCountry for edit and NewCrmCountryFormGroupInput for create.
 */
type CrmCountryFormGroupInput = ICrmCountry | PartialWithRequiredKeyOf<NewCrmCountry>;

type CrmCountryFormDefaults = Pick<NewCrmCountry, 'id'>;

type CrmCountryFormGroupContent = {
  id: FormControl<ICrmCountry['id'] | NewCrmCountry['id']>;
  countryName: FormControl<ICrmCountry['countryName']>;
};

export type CrmCountryFormGroup = FormGroup<CrmCountryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrmCountryFormService {
  createCrmCountryFormGroup(crmCountry: CrmCountryFormGroupInput = { id: null }): CrmCountryFormGroup {
    const crmCountryRawValue = {
      ...this.getFormDefaults(),
      ...crmCountry,
    };
    return new FormGroup<CrmCountryFormGroupContent>({
      id: new FormControl(
        { value: crmCountryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      countryName: new FormControl(crmCountryRawValue.countryName),
    });
  }

  getCrmCountry(form: CrmCountryFormGroup): ICrmCountry | NewCrmCountry {
    return form.getRawValue() as ICrmCountry | NewCrmCountry;
  }

  resetForm(form: CrmCountryFormGroup, crmCountry: CrmCountryFormGroupInput): void {
    const crmCountryRawValue = { ...this.getFormDefaults(), ...crmCountry };
    form.reset(
      {
        ...crmCountryRawValue,
        id: { value: crmCountryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrmCountryFormDefaults {
    return {
      id: null,
    };
  }
}
