import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrmCOntactSource, NewCrmCOntactSource } from '../crm-c-ontact-source.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrmCOntactSource for edit and NewCrmCOntactSourceFormGroupInput for create.
 */
type CrmCOntactSourceFormGroupInput = ICrmCOntactSource | PartialWithRequiredKeyOf<NewCrmCOntactSource>;

type CrmCOntactSourceFormDefaults = Pick<NewCrmCOntactSource, 'id'>;

type CrmCOntactSourceFormGroupContent = {
  id: FormControl<ICrmCOntactSource['id'] | NewCrmCOntactSource['id']>;
  contactSource: FormControl<ICrmCOntactSource['contactSource']>;
};

export type CrmCOntactSourceFormGroup = FormGroup<CrmCOntactSourceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrmCOntactSourceFormService {
  createCrmCOntactSourceFormGroup(crmCOntactSource: CrmCOntactSourceFormGroupInput = { id: null }): CrmCOntactSourceFormGroup {
    const crmCOntactSourceRawValue = {
      ...this.getFormDefaults(),
      ...crmCOntactSource,
    };
    return new FormGroup<CrmCOntactSourceFormGroupContent>({
      id: new FormControl(
        { value: crmCOntactSourceRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      contactSource: new FormControl(crmCOntactSourceRawValue.contactSource),
    });
  }

  getCrmCOntactSource(form: CrmCOntactSourceFormGroup): ICrmCOntactSource | NewCrmCOntactSource {
    return form.getRawValue() as ICrmCOntactSource | NewCrmCOntactSource;
  }

  resetForm(form: CrmCOntactSourceFormGroup, crmCOntactSource: CrmCOntactSourceFormGroupInput): void {
    const crmCOntactSourceRawValue = { ...this.getFormDefaults(), ...crmCOntactSource };
    form.reset(
      {
        ...crmCOntactSourceRawValue,
        id: { value: crmCOntactSourceRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrmCOntactSourceFormDefaults {
    return {
      id: null,
    };
  }
}
