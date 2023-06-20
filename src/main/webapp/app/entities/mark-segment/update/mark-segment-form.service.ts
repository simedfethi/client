import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IMarkSegment, NewMarkSegment } from '../mark-segment.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMarkSegment for edit and NewMarkSegmentFormGroupInput for create.
 */
type MarkSegmentFormGroupInput = IMarkSegment | PartialWithRequiredKeyOf<NewMarkSegment>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IMarkSegment | NewMarkSegment> = Omit<T, 'createdAt'> & {
  createdAt?: string | null;
};

type MarkSegmentFormRawValue = FormValueOf<IMarkSegment>;

type NewMarkSegmentFormRawValue = FormValueOf<NewMarkSegment>;

type MarkSegmentFormDefaults = Pick<NewMarkSegment, 'id' | 'createdAt' | 'markCompaigns'>;

type MarkSegmentFormGroupContent = {
  id: FormControl<MarkSegmentFormRawValue['id'] | NewMarkSegment['id']>;
  segmentName: FormControl<MarkSegmentFormRawValue['segmentName']>;
  customerFilter: FormControl<MarkSegmentFormRawValue['customerFilter']>;
  contactFilter: FormControl<MarkSegmentFormRawValue['contactFilter']>;
  destinataires: FormControl<MarkSegmentFormRawValue['destinataires']>;
  createdAt: FormControl<MarkSegmentFormRawValue['createdAt']>;
  markCompaigns: FormControl<MarkSegmentFormRawValue['markCompaigns']>;
};

export type MarkSegmentFormGroup = FormGroup<MarkSegmentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MarkSegmentFormService {
  createMarkSegmentFormGroup(markSegment: MarkSegmentFormGroupInput = { id: null }): MarkSegmentFormGroup {
    const markSegmentRawValue = this.convertMarkSegmentToMarkSegmentRawValue({
      ...this.getFormDefaults(),
      ...markSegment,
    });
    return new FormGroup<MarkSegmentFormGroupContent>({
      id: new FormControl(
        { value: markSegmentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      segmentName: new FormControl(markSegmentRawValue.segmentName),
      customerFilter: new FormControl(markSegmentRawValue.customerFilter),
      contactFilter: new FormControl(markSegmentRawValue.contactFilter),
      destinataires: new FormControl(markSegmentRawValue.destinataires),
      createdAt: new FormControl(markSegmentRawValue.createdAt),
      markCompaigns: new FormControl(markSegmentRawValue.markCompaigns ?? []),
    });
  }

  getMarkSegment(form: MarkSegmentFormGroup): IMarkSegment | NewMarkSegment {
    return this.convertMarkSegmentRawValueToMarkSegment(form.getRawValue() as MarkSegmentFormRawValue | NewMarkSegmentFormRawValue);
  }

  resetForm(form: MarkSegmentFormGroup, markSegment: MarkSegmentFormGroupInput): void {
    const markSegmentRawValue = this.convertMarkSegmentToMarkSegmentRawValue({ ...this.getFormDefaults(), ...markSegment });
    form.reset(
      {
        ...markSegmentRawValue,
        id: { value: markSegmentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MarkSegmentFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
      markCompaigns: [],
    };
  }

  private convertMarkSegmentRawValueToMarkSegment(
    rawMarkSegment: MarkSegmentFormRawValue | NewMarkSegmentFormRawValue
  ): IMarkSegment | NewMarkSegment {
    return {
      ...rawMarkSegment,
      createdAt: dayjs(rawMarkSegment.createdAt, DATE_TIME_FORMAT),
    };
  }

  private convertMarkSegmentToMarkSegmentRawValue(
    markSegment: IMarkSegment | (Partial<NewMarkSegment> & MarkSegmentFormDefaults)
  ): MarkSegmentFormRawValue | PartialWithRequiredKeyOf<NewMarkSegmentFormRawValue> {
    return {
      ...markSegment,
      createdAt: markSegment.createdAt ? markSegment.createdAt.format(DATE_TIME_FORMAT) : undefined,
      markCompaigns: markSegment.markCompaigns ?? [],
    };
  }
}
