import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDeliveryTerm, NewDeliveryTerm } from '../delivery-term.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDeliveryTerm for edit and NewDeliveryTermFormGroupInput for create.
 */
type DeliveryTermFormGroupInput = IDeliveryTerm | PartialWithRequiredKeyOf<NewDeliveryTerm>;

type DeliveryTermFormDefaults = Pick<NewDeliveryTerm, 'id'>;

type DeliveryTermFormGroupContent = {
  id: FormControl<IDeliveryTerm['id'] | NewDeliveryTerm['id']>;
  delTerm: FormControl<IDeliveryTerm['delTerm']>;
};

export type DeliveryTermFormGroup = FormGroup<DeliveryTermFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DeliveryTermFormService {
  createDeliveryTermFormGroup(deliveryTerm: DeliveryTermFormGroupInput = { id: null }): DeliveryTermFormGroup {
    const deliveryTermRawValue = {
      ...this.getFormDefaults(),
      ...deliveryTerm,
    };
    return new FormGroup<DeliveryTermFormGroupContent>({
      id: new FormControl(
        { value: deliveryTermRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      delTerm: new FormControl(deliveryTermRawValue.delTerm),
    });
  }

  getDeliveryTerm(form: DeliveryTermFormGroup): IDeliveryTerm | NewDeliveryTerm {
    return form.getRawValue() as IDeliveryTerm | NewDeliveryTerm;
  }

  resetForm(form: DeliveryTermFormGroup, deliveryTerm: DeliveryTermFormGroupInput): void {
    const deliveryTermRawValue = { ...this.getFormDefaults(), ...deliveryTerm };
    form.reset(
      {
        ...deliveryTermRawValue,
        id: { value: deliveryTermRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DeliveryTermFormDefaults {
    return {
      id: null,
    };
  }
}
