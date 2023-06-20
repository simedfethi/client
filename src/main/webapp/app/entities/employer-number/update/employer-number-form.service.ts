import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEmployerNumber, NewEmployerNumber } from '../employer-number.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEmployerNumber for edit and NewEmployerNumberFormGroupInput for create.
 */
type EmployerNumberFormGroupInput = IEmployerNumber | PartialWithRequiredKeyOf<NewEmployerNumber>;

type EmployerNumberFormDefaults = Pick<NewEmployerNumber, 'id'>;

type EmployerNumberFormGroupContent = {
  id: FormControl<IEmployerNumber['id'] | NewEmployerNumber['id']>;
  emplNumber: FormControl<IEmployerNumber['emplNumber']>;
};

export type EmployerNumberFormGroup = FormGroup<EmployerNumberFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EmployerNumberFormService {
  createEmployerNumberFormGroup(employerNumber: EmployerNumberFormGroupInput = { id: null }): EmployerNumberFormGroup {
    const employerNumberRawValue = {
      ...this.getFormDefaults(),
      ...employerNumber,
    };
    return new FormGroup<EmployerNumberFormGroupContent>({
      id: new FormControl(
        { value: employerNumberRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      emplNumber: new FormControl(employerNumberRawValue.emplNumber),
    });
  }

  getEmployerNumber(form: EmployerNumberFormGroup): IEmployerNumber | NewEmployerNumber {
    return form.getRawValue() as IEmployerNumber | NewEmployerNumber;
  }

  resetForm(form: EmployerNumberFormGroup, employerNumber: EmployerNumberFormGroupInput): void {
    const employerNumberRawValue = { ...this.getFormDefaults(), ...employerNumber };
    form.reset(
      {
        ...employerNumberRawValue,
        id: { value: employerNumberRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EmployerNumberFormDefaults {
    return {
      id: null,
    };
  }
}
