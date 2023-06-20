import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICustomerCategory, NewCustomerCategory } from '../customer-category.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICustomerCategory for edit and NewCustomerCategoryFormGroupInput for create.
 */
type CustomerCategoryFormGroupInput = ICustomerCategory | PartialWithRequiredKeyOf<NewCustomerCategory>;

type CustomerCategoryFormDefaults = Pick<NewCustomerCategory, 'id'>;

type CustomerCategoryFormGroupContent = {
  id: FormControl<ICustomerCategory['id'] | NewCustomerCategory['id']>;
  catCode: FormControl<ICustomerCategory['catCode']>;
  catName: FormControl<ICustomerCategory['catName']>;
};

export type CustomerCategoryFormGroup = FormGroup<CustomerCategoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CustomerCategoryFormService {
  createCustomerCategoryFormGroup(customerCategory: CustomerCategoryFormGroupInput = { id: null }): CustomerCategoryFormGroup {
    const customerCategoryRawValue = {
      ...this.getFormDefaults(),
      ...customerCategory,
    };
    return new FormGroup<CustomerCategoryFormGroupContent>({
      id: new FormControl(
        { value: customerCategoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      catCode: new FormControl(customerCategoryRawValue.catCode),
      catName: new FormControl(customerCategoryRawValue.catName),
    });
  }

  getCustomerCategory(form: CustomerCategoryFormGroup): ICustomerCategory | NewCustomerCategory {
    return form.getRawValue() as ICustomerCategory | NewCustomerCategory;
  }

  resetForm(form: CustomerCategoryFormGroup, customerCategory: CustomerCategoryFormGroupInput): void {
    const customerCategoryRawValue = { ...this.getFormDefaults(), ...customerCategory };
    form.reset(
      {
        ...customerCategoryRawValue,
        id: { value: customerCategoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CustomerCategoryFormDefaults {
    return {
      id: null,
    };
  }
}
