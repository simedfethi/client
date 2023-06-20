import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProductvariante, NewProductvariante } from '../productvariante.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProductvariante for edit and NewProductvarianteFormGroupInput for create.
 */
type ProductvarianteFormGroupInput = IProductvariante | PartialWithRequiredKeyOf<NewProductvariante>;

type ProductvarianteFormDefaults = Pick<NewProductvariante, 'id' | 'products'>;

type ProductvarianteFormGroupContent = {
  id: FormControl<IProductvariante['id'] | NewProductvariante['id']>;
  picture: FormControl<IProductvariante['picture']>;
  pictureContentType: FormControl<IProductvariante['pictureContentType']>;
  codebarre: FormControl<IProductvariante['codebarre']>;
  productCode: FormControl<IProductvariante['productCode']>;
  salePrice: FormControl<IProductvariante['salePrice']>;
  uniteMesure: FormControl<IProductvariante['uniteMesure']>;
  stockDisponible: FormControl<IProductvariante['stockDisponible']>;
  products: FormControl<IProductvariante['products']>;
};

export type ProductvarianteFormGroup = FormGroup<ProductvarianteFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProductvarianteFormService {
  createProductvarianteFormGroup(productvariante: ProductvarianteFormGroupInput = { id: null }): ProductvarianteFormGroup {
    const productvarianteRawValue = {
      ...this.getFormDefaults(),
      ...productvariante,
    };
    return new FormGroup<ProductvarianteFormGroupContent>({
      id: new FormControl(
        { value: productvarianteRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      picture: new FormControl(productvarianteRawValue.picture),
      pictureContentType: new FormControl(productvarianteRawValue.pictureContentType),
      codebarre: new FormControl(productvarianteRawValue.codebarre),
      productCode: new FormControl(productvarianteRawValue.productCode, {
        validators: [Validators.maxLength(50)],
      }),
      salePrice: new FormControl(productvarianteRawValue.salePrice),
      uniteMesure: new FormControl(productvarianteRawValue.uniteMesure, {
        validators: [Validators.maxLength(50)],
      }),
      stockDisponible: new FormControl(productvarianteRawValue.stockDisponible),
      products: new FormControl(productvarianteRawValue.products ?? []),
    });
  }

  getProductvariante(form: ProductvarianteFormGroup): IProductvariante | NewProductvariante {
    return form.getRawValue() as IProductvariante | NewProductvariante;
  }

  resetForm(form: ProductvarianteFormGroup, productvariante: ProductvarianteFormGroupInput): void {
    const productvarianteRawValue = { ...this.getFormDefaults(), ...productvariante };
    form.reset(
      {
        ...productvarianteRawValue,
        id: { value: productvarianteRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProductvarianteFormDefaults {
    return {
      id: null,
      products: [],
    };
  }
}
