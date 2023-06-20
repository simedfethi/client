import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IMarkStHistory, NewMarkStHistory } from '../mark-st-history.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMarkStHistory for edit and NewMarkStHistoryFormGroupInput for create.
 */
type MarkStHistoryFormGroupInput = IMarkStHistory | PartialWithRequiredKeyOf<NewMarkStHistory>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IMarkStHistory | NewMarkStHistory> = Omit<T, 'startTime' | 'endTime'> & {
  startTime?: string | null;
  endTime?: string | null;
};

type MarkStHistoryFormRawValue = FormValueOf<IMarkStHistory>;

type NewMarkStHistoryFormRawValue = FormValueOf<NewMarkStHistory>;

type MarkStHistoryFormDefaults = Pick<NewMarkStHistory, 'id' | 'startTime' | 'endTime'>;

type MarkStHistoryFormGroupContent = {
  id: FormControl<MarkStHistoryFormRawValue['id'] | NewMarkStHistory['id']>;
  startTime: FormControl<MarkStHistoryFormRawValue['startTime']>;
  endTime: FormControl<MarkStHistoryFormRawValue['endTime']>;
  createdby: FormControl<MarkStHistoryFormRawValue['createdby']>;
  transactionCRM: FormControl<MarkStHistoryFormRawValue['transactionCRM']>;
  trEtape: FormControl<MarkStHistoryFormRawValue['trEtape']>;
};

export type MarkStHistoryFormGroup = FormGroup<MarkStHistoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MarkStHistoryFormService {
  createMarkStHistoryFormGroup(markStHistory: MarkStHistoryFormGroupInput = { id: null }): MarkStHistoryFormGroup {
    const markStHistoryRawValue = this.convertMarkStHistoryToMarkStHistoryRawValue({
      ...this.getFormDefaults(),
      ...markStHistory,
    });
    return new FormGroup<MarkStHistoryFormGroupContent>({
      id: new FormControl(
        { value: markStHistoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      startTime: new FormControl(markStHistoryRawValue.startTime),
      endTime: new FormControl(markStHistoryRawValue.endTime),
      createdby: new FormControl(markStHistoryRawValue.createdby),
      transactionCRM: new FormControl(markStHistoryRawValue.transactionCRM),
      trEtape: new FormControl(markStHistoryRawValue.trEtape),
    });
  }

  getMarkStHistory(form: MarkStHistoryFormGroup): IMarkStHistory | NewMarkStHistory {
    return this.convertMarkStHistoryRawValueToMarkStHistory(form.getRawValue() as MarkStHistoryFormRawValue | NewMarkStHistoryFormRawValue);
  }

  resetForm(form: MarkStHistoryFormGroup, markStHistory: MarkStHistoryFormGroupInput): void {
    const markStHistoryRawValue = this.convertMarkStHistoryToMarkStHistoryRawValue({ ...this.getFormDefaults(), ...markStHistory });
    form.reset(
      {
        ...markStHistoryRawValue,
        id: { value: markStHistoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MarkStHistoryFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      startTime: currentTime,
      endTime: currentTime,
    };
  }

  private convertMarkStHistoryRawValueToMarkStHistory(
    rawMarkStHistory: MarkStHistoryFormRawValue | NewMarkStHistoryFormRawValue
  ): IMarkStHistory | NewMarkStHistory {
    return {
      ...rawMarkStHistory,
      startTime: dayjs(rawMarkStHistory.startTime, DATE_TIME_FORMAT),
      endTime: dayjs(rawMarkStHistory.endTime, DATE_TIME_FORMAT),
    };
  }

  private convertMarkStHistoryToMarkStHistoryRawValue(
    markStHistory: IMarkStHistory | (Partial<NewMarkStHistory> & MarkStHistoryFormDefaults)
  ): MarkStHistoryFormRawValue | PartialWithRequiredKeyOf<NewMarkStHistoryFormRawValue> {
    return {
      ...markStHistory,
      startTime: markStHistory.startTime ? markStHistory.startTime.format(DATE_TIME_FORMAT) : undefined,
      endTime: markStHistory.endTime ? markStHistory.endTime.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
