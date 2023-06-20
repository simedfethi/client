import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrmWilaya, NewCrmWilaya } from '../crm-wilaya.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrmWilaya for edit and NewCrmWilayaFormGroupInput for create.
 */
type CrmWilayaFormGroupInput = ICrmWilaya | PartialWithRequiredKeyOf<NewCrmWilaya>;

type CrmWilayaFormDefaults = Pick<NewCrmWilaya, 'id'>;

type CrmWilayaFormGroupContent = {
  id: FormControl<ICrmWilaya['id'] | NewCrmWilaya['id']>;
  wilayaName: FormControl<ICrmWilaya['wilayaName']>;
  crmCountry: FormControl<ICrmWilaya['crmCountry']>;
};

export type CrmWilayaFormGroup = FormGroup<CrmWilayaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrmWilayaFormService {
  createCrmWilayaFormGroup(crmWilaya: CrmWilayaFormGroupInput = { id: null }): CrmWilayaFormGroup {
    const crmWilayaRawValue = {
      ...this.getFormDefaults(),
      ...crmWilaya,
    };
    return new FormGroup<CrmWilayaFormGroupContent>({
      id: new FormControl(
        { value: crmWilayaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      wilayaName: new FormControl(crmWilayaRawValue.wilayaName),
      crmCountry: new FormControl(crmWilayaRawValue.crmCountry),
    });
  }

  getCrmWilaya(form: CrmWilayaFormGroup): ICrmWilaya | NewCrmWilaya {
    return form.getRawValue() as ICrmWilaya | NewCrmWilaya;
  }

  resetForm(form: CrmWilayaFormGroup, crmWilaya: CrmWilayaFormGroupInput): void {
    const crmWilayaRawValue = { ...this.getFormDefaults(), ...crmWilaya };
    form.reset(
      {
        ...crmWilayaRawValue,
        id: { value: crmWilayaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrmWilayaFormDefaults {
    return {
      id: null,
    };
  }
}
