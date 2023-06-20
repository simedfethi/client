import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISupplierOffer, NewSupplierOffer } from '../supplier-offer.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISupplierOffer for edit and NewSupplierOfferFormGroupInput for create.
 */
type SupplierOfferFormGroupInput = ISupplierOffer | PartialWithRequiredKeyOf<NewSupplierOffer>;

type SupplierOfferFormDefaults = Pick<NewSupplierOffer, 'id'>;

type SupplierOfferFormGroupContent = {
  id: FormControl<ISupplierOffer['id'] | NewSupplierOffer['id']>;
  regularPrice: FormControl<ISupplierOffer['regularPrice']>;
  discountPrice: FormControl<ISupplierOffer['discountPrice']>;
  notes: FormControl<ISupplierOffer['notes']>;
  product: FormControl<ISupplierOffer['product']>;
  uniteMesure: FormControl<ISupplierOffer['uniteMesure']>;
  supplier: FormControl<ISupplierOffer['supplier']>;
  transactionCRM: FormControl<ISupplierOffer['transactionCRM']>;
  deliveryTerm: FormControl<ISupplierOffer['deliveryTerm']>;
};

export type SupplierOfferFormGroup = FormGroup<SupplierOfferFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SupplierOfferFormService {
  createSupplierOfferFormGroup(supplierOffer: SupplierOfferFormGroupInput = { id: null }): SupplierOfferFormGroup {
    const supplierOfferRawValue = {
      ...this.getFormDefaults(),
      ...supplierOffer,
    };
    return new FormGroup<SupplierOfferFormGroupContent>({
      id: new FormControl(
        { value: supplierOfferRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      regularPrice: new FormControl(supplierOfferRawValue.regularPrice),
      discountPrice: new FormControl(supplierOfferRawValue.discountPrice),
      notes: new FormControl(supplierOfferRawValue.notes),
      product: new FormControl(supplierOfferRawValue.product),
      uniteMesure: new FormControl(supplierOfferRawValue.uniteMesure),
      supplier: new FormControl(supplierOfferRawValue.supplier),
      transactionCRM: new FormControl(supplierOfferRawValue.transactionCRM),
      deliveryTerm: new FormControl(supplierOfferRawValue.deliveryTerm),
    });
  }

  getSupplierOffer(form: SupplierOfferFormGroup): ISupplierOffer | NewSupplierOffer {
    return form.getRawValue() as ISupplierOffer | NewSupplierOffer;
  }

  resetForm(form: SupplierOfferFormGroup, supplierOffer: SupplierOfferFormGroupInput): void {
    const supplierOfferRawValue = { ...this.getFormDefaults(), ...supplierOffer };
    form.reset(
      {
        ...supplierOfferRawValue,
        id: { value: supplierOfferRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SupplierOfferFormDefaults {
    return {
      id: null,
    };
  }
}
