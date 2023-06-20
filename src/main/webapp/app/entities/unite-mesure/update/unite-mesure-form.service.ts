import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUniteMesure, NewUniteMesure } from '../unite-mesure.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUniteMesure for edit and NewUniteMesureFormGroupInput for create.
 */
type UniteMesureFormGroupInput = IUniteMesure | PartialWithRequiredKeyOf<NewUniteMesure>;

type UniteMesureFormDefaults = Pick<NewUniteMesure, 'id'>;

type UniteMesureFormGroupContent = {
  id: FormControl<IUniteMesure['id'] | NewUniteMesure['id']>;
  unitName: FormControl<IUniteMesure['unitName']>;
  unitShortName: FormControl<IUniteMesure['unitShortName']>;
};

export type UniteMesureFormGroup = FormGroup<UniteMesureFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UniteMesureFormService {
  createUniteMesureFormGroup(uniteMesure: UniteMesureFormGroupInput = { id: null }): UniteMesureFormGroup {
    const uniteMesureRawValue = {
      ...this.getFormDefaults(),
      ...uniteMesure,
    };
    return new FormGroup<UniteMesureFormGroupContent>({
      id: new FormControl(
        { value: uniteMesureRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      unitName: new FormControl(uniteMesureRawValue.unitName),
      unitShortName: new FormControl(uniteMesureRawValue.unitShortName),
    });
  }

  getUniteMesure(form: UniteMesureFormGroup): IUniteMesure | NewUniteMesure {
    return form.getRawValue() as IUniteMesure | NewUniteMesure;
  }

  resetForm(form: UniteMesureFormGroup, uniteMesure: UniteMesureFormGroupInput): void {
    const uniteMesureRawValue = { ...this.getFormDefaults(), ...uniteMesure };
    form.reset(
      {
        ...uniteMesureRawValue,
        id: { value: uniteMesureRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UniteMesureFormDefaults {
    return {
      id: null,
    };
  }
}
