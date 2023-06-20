import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrmContactType, NewCrmContactType } from '../crm-contact-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrmContactType for edit and NewCrmContactTypeFormGroupInput for create.
 */
type CrmContactTypeFormGroupInput = ICrmContactType | PartialWithRequiredKeyOf<NewCrmContactType>;

type CrmContactTypeFormDefaults = Pick<NewCrmContactType, 'id'>;

type CrmContactTypeFormGroupContent = {
  id: FormControl<ICrmContactType['id'] | NewCrmContactType['id']>;
  contactType: FormControl<ICrmContactType['contactType']>;
};

export type CrmContactTypeFormGroup = FormGroup<CrmContactTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrmContactTypeFormService {
  createCrmContactTypeFormGroup(crmContactType: CrmContactTypeFormGroupInput = { id: null }): CrmContactTypeFormGroup {
    const crmContactTypeRawValue = {
      ...this.getFormDefaults(),
      ...crmContactType,
    };
    return new FormGroup<CrmContactTypeFormGroupContent>({
      id: new FormControl(
        { value: crmContactTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      contactType: new FormControl(crmContactTypeRawValue.contactType),
    });
  }

  getCrmContactType(form: CrmContactTypeFormGroup): ICrmContactType | NewCrmContactType {
    return form.getRawValue() as ICrmContactType | NewCrmContactType;
  }

  resetForm(form: CrmContactTypeFormGroup, crmContactType: CrmContactTypeFormGroupInput): void {
    const crmContactTypeRawValue = { ...this.getFormDefaults(), ...crmContactType };
    form.reset(
      {
        ...crmContactTypeRawValue,
        id: { value: crmContactTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrmContactTypeFormDefaults {
    return {
      id: null,
    };
  }
}
