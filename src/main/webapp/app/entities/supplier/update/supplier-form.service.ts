import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISupplier, NewSupplier } from '../supplier.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISupplier for edit and NewSupplierFormGroupInput for create.
 */
type SupplierFormGroupInput = ISupplier | PartialWithRequiredKeyOf<NewSupplier>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ISupplier | NewSupplier> = Omit<T, 'createdAt'> & {
  createdAt?: string | null;
};

type SupplierFormRawValue = FormValueOf<ISupplier>;

type NewSupplierFormRawValue = FormValueOf<NewSupplier>;

type SupplierFormDefaults = Pick<NewSupplier, 'id' | 'createdAt'>;

type SupplierFormGroupContent = {
  id: FormControl<SupplierFormRawValue['id'] | NewSupplier['id']>;
  companyName: FormControl<SupplierFormRawValue['companyName']>;
  adresse: FormControl<SupplierFormRawValue['adresse']>;
  tel: FormControl<SupplierFormRawValue['tel']>;
  mobile: FormControl<SupplierFormRawValue['mobile']>;
  emailAdress: FormControl<SupplierFormRawValue['emailAdress']>;
  createdAt: FormControl<SupplierFormRawValue['createdAt']>;
  categorie: FormControl<SupplierFormRawValue['categorie']>;
};

export type SupplierFormGroup = FormGroup<SupplierFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SupplierFormService {
  createSupplierFormGroup(supplier: SupplierFormGroupInput = { id: null }): SupplierFormGroup {
    const supplierRawValue = this.convertSupplierToSupplierRawValue({
      ...this.getFormDefaults(),
      ...supplier,
    });
    return new FormGroup<SupplierFormGroupContent>({
      id: new FormControl(
        { value: supplierRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      companyName: new FormControl(supplierRawValue.companyName),
      adresse: new FormControl(supplierRawValue.adresse),
      tel: new FormControl(supplierRawValue.tel),
      mobile: new FormControl(supplierRawValue.mobile),
      emailAdress: new FormControl(supplierRawValue.emailAdress),
      createdAt: new FormControl(supplierRawValue.createdAt),
      categorie: new FormControl(supplierRawValue.categorie),
    });
  }

  getSupplier(form: SupplierFormGroup): ISupplier | NewSupplier {
    return this.convertSupplierRawValueToSupplier(form.getRawValue() as SupplierFormRawValue | NewSupplierFormRawValue);
  }

  resetForm(form: SupplierFormGroup, supplier: SupplierFormGroupInput): void {
    const supplierRawValue = this.convertSupplierToSupplierRawValue({ ...this.getFormDefaults(), ...supplier });
    form.reset(
      {
        ...supplierRawValue,
        id: { value: supplierRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SupplierFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
    };
  }

  private convertSupplierRawValueToSupplier(rawSupplier: SupplierFormRawValue | NewSupplierFormRawValue): ISupplier | NewSupplier {
    return {
      ...rawSupplier,
      createdAt: dayjs(rawSupplier.createdAt, DATE_TIME_FORMAT),
    };
  }

  private convertSupplierToSupplierRawValue(
    supplier: ISupplier | (Partial<NewSupplier> & SupplierFormDefaults)
  ): SupplierFormRawValue | PartialWithRequiredKeyOf<NewSupplierFormRawValue> {
    return {
      ...supplier,
      createdAt: supplier.createdAt ? supplier.createdAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
