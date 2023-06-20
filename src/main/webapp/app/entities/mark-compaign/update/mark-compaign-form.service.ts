import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IMarkCompaign, NewMarkCompaign } from '../mark-compaign.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMarkCompaign for edit and NewMarkCompaignFormGroupInput for create.
 */
type MarkCompaignFormGroupInput = IMarkCompaign | PartialWithRequiredKeyOf<NewMarkCompaign>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IMarkCompaign | NewMarkCompaign> = Omit<T, 'sendTime' | 'createdAt' | 'endAt'> & {
  sendTime?: string | null;
  createdAt?: string | null;
  endAt?: string | null;
};

type MarkCompaignFormRawValue = FormValueOf<IMarkCompaign>;

type NewMarkCompaignFormRawValue = FormValueOf<NewMarkCompaign>;

type MarkCompaignFormDefaults = Pick<NewMarkCompaign, 'id' | 'sendTime' | 'createdAt' | 'endAt' | 'markSegments'>;

type MarkCompaignFormGroupContent = {
  id: FormControl<MarkCompaignFormRawValue['id'] | NewMarkCompaign['id']>;
  subject: FormControl<MarkCompaignFormRawValue['subject']>;
  compaigntype: FormControl<MarkCompaignFormRawValue['compaigntype']>;
  attachement: FormControl<MarkCompaignFormRawValue['attachement']>;
  linkParam: FormControl<MarkCompaignFormRawValue['linkParam']>;
  priorityM: FormControl<MarkCompaignFormRawValue['priorityM']>;
  currentAction: FormControl<MarkCompaignFormRawValue['currentAction']>;
  receipientTotal: FormControl<MarkCompaignFormRawValue['receipientTotal']>;
  receipientReceive: FormControl<MarkCompaignFormRawValue['receipientReceive']>;
  receipientView: FormControl<MarkCompaignFormRawValue['receipientView']>;
  receipientClick: FormControl<MarkCompaignFormRawValue['receipientClick']>;
  sendTime: FormControl<MarkCompaignFormRawValue['sendTime']>;
  createdAt: FormControl<MarkCompaignFormRawValue['createdAt']>;
  endAt: FormControl<MarkCompaignFormRawValue['endAt']>;
  templateContent: FormControl<MarkCompaignFormRawValue['templateContent']>;
  htmlContent: FormControl<MarkCompaignFormRawValue['htmlContent']>;
  sender: FormControl<MarkCompaignFormRawValue['sender']>;
  markSegments: FormControl<MarkCompaignFormRawValue['markSegments']>;
};

export type MarkCompaignFormGroup = FormGroup<MarkCompaignFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MarkCompaignFormService {
  createMarkCompaignFormGroup(markCompaign: MarkCompaignFormGroupInput = { id: null }): MarkCompaignFormGroup {
    const markCompaignRawValue = this.convertMarkCompaignToMarkCompaignRawValue({
      ...this.getFormDefaults(),
      ...markCompaign,
    });
    return new FormGroup<MarkCompaignFormGroupContent>({
      id: new FormControl(
        { value: markCompaignRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      subject: new FormControl(markCompaignRawValue.subject),
      compaigntype: new FormControl(markCompaignRawValue.compaigntype),
      attachement: new FormControl(markCompaignRawValue.attachement),
      linkParam: new FormControl(markCompaignRawValue.linkParam),
      priorityM: new FormControl(markCompaignRawValue.priorityM),
      currentAction: new FormControl(markCompaignRawValue.currentAction),
      receipientTotal: new FormControl(markCompaignRawValue.receipientTotal),
      receipientReceive: new FormControl(markCompaignRawValue.receipientReceive),
      receipientView: new FormControl(markCompaignRawValue.receipientView),
      receipientClick: new FormControl(markCompaignRawValue.receipientClick),
      sendTime: new FormControl(markCompaignRawValue.sendTime),
      createdAt: new FormControl(markCompaignRawValue.createdAt),
      endAt: new FormControl(markCompaignRawValue.endAt),
      templateContent: new FormControl(markCompaignRawValue.templateContent),
      htmlContent: new FormControl(markCompaignRawValue.htmlContent),
      sender: new FormControl(markCompaignRawValue.sender),
      markSegments: new FormControl(markCompaignRawValue.markSegments ?? []),
    });
  }

  getMarkCompaign(form: MarkCompaignFormGroup): IMarkCompaign | NewMarkCompaign {
    return this.convertMarkCompaignRawValueToMarkCompaign(form.getRawValue() as MarkCompaignFormRawValue | NewMarkCompaignFormRawValue);
  }

  resetForm(form: MarkCompaignFormGroup, markCompaign: MarkCompaignFormGroupInput): void {
    const markCompaignRawValue = this.convertMarkCompaignToMarkCompaignRawValue({ ...this.getFormDefaults(), ...markCompaign });
    form.reset(
      {
        ...markCompaignRawValue,
        id: { value: markCompaignRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MarkCompaignFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      sendTime: currentTime,
      createdAt: currentTime,
      endAt: currentTime,
      markSegments: [],
    };
  }

  private convertMarkCompaignRawValueToMarkCompaign(
    rawMarkCompaign: MarkCompaignFormRawValue | NewMarkCompaignFormRawValue
  ): IMarkCompaign | NewMarkCompaign {
    return {
      ...rawMarkCompaign,
      sendTime: dayjs(rawMarkCompaign.sendTime, DATE_TIME_FORMAT),
      createdAt: dayjs(rawMarkCompaign.createdAt, DATE_TIME_FORMAT),
      endAt: dayjs(rawMarkCompaign.endAt, DATE_TIME_FORMAT),
    };
  }

  private convertMarkCompaignToMarkCompaignRawValue(
    markCompaign: IMarkCompaign | (Partial<NewMarkCompaign> & MarkCompaignFormDefaults)
  ): MarkCompaignFormRawValue | PartialWithRequiredKeyOf<NewMarkCompaignFormRawValue> {
    return {
      ...markCompaign,
      sendTime: markCompaign.sendTime ? markCompaign.sendTime.format(DATE_TIME_FORMAT) : undefined,
      createdAt: markCompaign.createdAt ? markCompaign.createdAt.format(DATE_TIME_FORMAT) : undefined,
      endAt: markCompaign.endAt ? markCompaign.endAt.format(DATE_TIME_FORMAT) : undefined,
      markSegments: markCompaign.markSegments ?? [],
    };
  }
}
