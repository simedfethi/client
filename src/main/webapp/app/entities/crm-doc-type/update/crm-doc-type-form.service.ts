import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrmDocType, NewCrmDocType } from '../crm-doc-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrmDocType for edit and NewCrmDocTypeFormGroupInput for create.
 */
type CrmDocTypeFormGroupInput = ICrmDocType | PartialWithRequiredKeyOf<NewCrmDocType>;

type CrmDocTypeFormDefaults = Pick<NewCrmDocType, 'id'>;

type CrmDocTypeFormGroupContent = {
  id: FormControl<ICrmDocType['id'] | NewCrmDocType['id']>;
  cdtname: FormControl<ICrmDocType['cdtname']>;
  cdtRef: FormControl<ICrmDocType['cdtRef']>;
};

export type CrmDocTypeFormGroup = FormGroup<CrmDocTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrmDocTypeFormService {
  createCrmDocTypeFormGroup(crmDocType: CrmDocTypeFormGroupInput = { id: null }): CrmDocTypeFormGroup {
    const crmDocTypeRawValue = {
      ...this.getFormDefaults(),
      ...crmDocType,
    };
    return new FormGroup<CrmDocTypeFormGroupContent>({
      id: new FormControl(
        { value: crmDocTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cdtname: new FormControl(crmDocTypeRawValue.cdtname),
      cdtRef: new FormControl(crmDocTypeRawValue.cdtRef),
    });
  }

  getCrmDocType(form: CrmDocTypeFormGroup): ICrmDocType | NewCrmDocType {
    return form.getRawValue() as ICrmDocType | NewCrmDocType;
  }

  resetForm(form: CrmDocTypeFormGroup, crmDocType: CrmDocTypeFormGroupInput): void {
    const crmDocTypeRawValue = { ...this.getFormDefaults(), ...crmDocType };
    form.reset(
      {
        ...crmDocTypeRawValue,
        id: { value: crmDocTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrmDocTypeFormDefaults {
    return {
      id: null,
    };
  }
}
