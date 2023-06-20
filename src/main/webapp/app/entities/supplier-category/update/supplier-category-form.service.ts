import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISupplierCategory, NewSupplierCategory } from '../supplier-category.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISupplierCategory for edit and NewSupplierCategoryFormGroupInput for create.
 */
type SupplierCategoryFormGroupInput = ISupplierCategory | PartialWithRequiredKeyOf<NewSupplierCategory>;

type SupplierCategoryFormDefaults = Pick<NewSupplierCategory, 'id'>;

type SupplierCategoryFormGroupContent = {
  id: FormControl<ISupplierCategory['id'] | NewSupplierCategory['id']>;
  spCategory: FormControl<ISupplierCategory['spCategory']>;
};

export type SupplierCategoryFormGroup = FormGroup<SupplierCategoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SupplierCategoryFormService {
  createSupplierCategoryFormGroup(supplierCategory: SupplierCategoryFormGroupInput = { id: null }): SupplierCategoryFormGroup {
    const supplierCategoryRawValue = {
      ...this.getFormDefaults(),
      ...supplierCategory,
    };
    return new FormGroup<SupplierCategoryFormGroupContent>({
      id: new FormControl(
        { value: supplierCategoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      spCategory: new FormControl(supplierCategoryRawValue.spCategory),
    });
  }

  getSupplierCategory(form: SupplierCategoryFormGroup): ISupplierCategory | NewSupplierCategory {
    return form.getRawValue() as ISupplierCategory | NewSupplierCategory;
  }

  resetForm(form: SupplierCategoryFormGroup, supplierCategory: SupplierCategoryFormGroupInput): void {
    const supplierCategoryRawValue = { ...this.getFormDefaults(), ...supplierCategory };
    form.reset(
      {
        ...supplierCategoryRawValue,
        id: { value: supplierCategoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SupplierCategoryFormDefaults {
    return {
      id: null,
    };
  }
}
