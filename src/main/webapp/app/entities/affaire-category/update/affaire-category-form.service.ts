import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAffaireCategory, NewAffaireCategory } from '../affaire-category.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAffaireCategory for edit and NewAffaireCategoryFormGroupInput for create.
 */
type AffaireCategoryFormGroupInput = IAffaireCategory | PartialWithRequiredKeyOf<NewAffaireCategory>;

type AffaireCategoryFormDefaults = Pick<NewAffaireCategory, 'id'>;

type AffaireCategoryFormGroupContent = {
  id: FormControl<IAffaireCategory['id'] | NewAffaireCategory['id']>;
  categoryName: FormControl<IAffaireCategory['categoryName']>;
};

export type AffaireCategoryFormGroup = FormGroup<AffaireCategoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AffaireCategoryFormService {
  createAffaireCategoryFormGroup(affaireCategory: AffaireCategoryFormGroupInput = { id: null }): AffaireCategoryFormGroup {
    const affaireCategoryRawValue = {
      ...this.getFormDefaults(),
      ...affaireCategory,
    };
    return new FormGroup<AffaireCategoryFormGroupContent>({
      id: new FormControl(
        { value: affaireCategoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      categoryName: new FormControl(affaireCategoryRawValue.categoryName),
    });
  }

  getAffaireCategory(form: AffaireCategoryFormGroup): IAffaireCategory | NewAffaireCategory {
    return form.getRawValue() as IAffaireCategory | NewAffaireCategory;
  }

  resetForm(form: AffaireCategoryFormGroup, affaireCategory: AffaireCategoryFormGroupInput): void {
    const affaireCategoryRawValue = { ...this.getFormDefaults(), ...affaireCategory };
    form.reset(
      {
        ...affaireCategoryRawValue,
        id: { value: affaireCategoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AffaireCategoryFormDefaults {
    return {
      id: null,
    };
  }
}
