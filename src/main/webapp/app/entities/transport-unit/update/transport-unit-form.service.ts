import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITransportUnit, NewTransportUnit } from '../transport-unit.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITransportUnit for edit and NewTransportUnitFormGroupInput for create.
 */
type TransportUnitFormGroupInput = ITransportUnit | PartialWithRequiredKeyOf<NewTransportUnit>;

type TransportUnitFormDefaults = Pick<NewTransportUnit, 'id'>;

type TransportUnitFormGroupContent = {
  id: FormControl<ITransportUnit['id'] | NewTransportUnit['id']>;
  tunitName: FormControl<ITransportUnit['tunitName']>;
  tunitmatricule: FormControl<ITransportUnit['tunitmatricule']>;
  tunitmatriculeRem: FormControl<ITransportUnit['tunitmatriculeRem']>;
  tunitmarque: FormControl<ITransportUnit['tunitmarque']>;
  tunitmodel: FormControl<ITransportUnit['tunitmodel']>;
  tunitcolor: FormControl<ITransportUnit['tunitcolor']>;
  tcapacity: FormControl<ITransportUnit['tcapacity']>;
};

export type TransportUnitFormGroup = FormGroup<TransportUnitFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TransportUnitFormService {
  createTransportUnitFormGroup(transportUnit: TransportUnitFormGroupInput = { id: null }): TransportUnitFormGroup {
    const transportUnitRawValue = {
      ...this.getFormDefaults(),
      ...transportUnit,
    };
    return new FormGroup<TransportUnitFormGroupContent>({
      id: new FormControl(
        { value: transportUnitRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      tunitName: new FormControl(transportUnitRawValue.tunitName),
      tunitmatricule: new FormControl(transportUnitRawValue.tunitmatricule),
      tunitmatriculeRem: new FormControl(transportUnitRawValue.tunitmatriculeRem),
      tunitmarque: new FormControl(transportUnitRawValue.tunitmarque),
      tunitmodel: new FormControl(transportUnitRawValue.tunitmodel),
      tunitcolor: new FormControl(transportUnitRawValue.tunitcolor),
      tcapacity: new FormControl(transportUnitRawValue.tcapacity),
    });
  }

  getTransportUnit(form: TransportUnitFormGroup): ITransportUnit | NewTransportUnit {
    return form.getRawValue() as ITransportUnit | NewTransportUnit;
  }

  resetForm(form: TransportUnitFormGroup, transportUnit: TransportUnitFormGroupInput): void {
    const transportUnitRawValue = { ...this.getFormDefaults(), ...transportUnit };
    form.reset(
      {
        ...transportUnitRawValue,
        id: { value: transportUnitRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TransportUnitFormDefaults {
    return {
      id: null,
    };
  }
}
