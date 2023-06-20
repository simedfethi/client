import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFilterList, NewFilterList } from '../filter-list.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFilterList for edit and NewFilterListFormGroupInput for create.
 */
type FilterListFormGroupInput = IFilterList | PartialWithRequiredKeyOf<NewFilterList>;

type FilterListFormDefaults = Pick<NewFilterList, 'id'>;

type FilterListFormGroupContent = {
  id: FormControl<IFilterList['id'] | NewFilterList['id']>;
  filterName: FormControl<IFilterList['filterName']>;
  filterString: FormControl<IFilterList['filterString']>;
  entname: FormControl<IFilterList['entname']>;
};

export type FilterListFormGroup = FormGroup<FilterListFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FilterListFormService {
  createFilterListFormGroup(filterList: FilterListFormGroupInput = { id: null }): FilterListFormGroup {
    const filterListRawValue = {
      ...this.getFormDefaults(),
      ...filterList,
    };
    return new FormGroup<FilterListFormGroupContent>({
      id: new FormControl(
        { value: filterListRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      filterName: new FormControl(filterListRawValue.filterName),
      filterString: new FormControl(filterListRawValue.filterString),
      entname: new FormControl(filterListRawValue.entname),
    });
  }

  getFilterList(form: FilterListFormGroup): IFilterList | NewFilterList {
    return form.getRawValue() as IFilterList | NewFilterList;
  }

  resetForm(form: FilterListFormGroup, filterList: FilterListFormGroupInput): void {
    const filterListRawValue = { ...this.getFormDefaults(), ...filterList };
    form.reset(
      {
        ...filterListRawValue,
        id: { value: filterListRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FilterListFormDefaults {
    return {
      id: null,
    };
  }
}
