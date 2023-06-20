import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IEmailTemplate, NewEmailTemplate } from '../email-template.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEmailTemplate for edit and NewEmailTemplateFormGroupInput for create.
 */
type EmailTemplateFormGroupInput = IEmailTemplate | PartialWithRequiredKeyOf<NewEmailTemplate>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IEmailTemplate | NewEmailTemplate> = Omit<T, 'createdAt'> & {
  createdAt?: string | null;
};

type EmailTemplateFormRawValue = FormValueOf<IEmailTemplate>;

type NewEmailTemplateFormRawValue = FormValueOf<NewEmailTemplate>;

type EmailTemplateFormDefaults = Pick<NewEmailTemplate, 'id' | 'createdAt'>;

type EmailTemplateFormGroupContent = {
  id: FormControl<EmailTemplateFormRawValue['id'] | NewEmailTemplate['id']>;
  templateName: FormControl<EmailTemplateFormRawValue['templateName']>;
  emailSubject: FormControl<EmailTemplateFormRawValue['emailSubject']>;
  templateContent: FormControl<EmailTemplateFormRawValue['templateContent']>;
  tempType: FormControl<EmailTemplateFormRawValue['tempType']>;
  htmlContent: FormControl<EmailTemplateFormRawValue['htmlContent']>;
  useCount: FormControl<EmailTemplateFormRawValue['useCount']>;
  createdAt: FormControl<EmailTemplateFormRawValue['createdAt']>;
  attachments: FormControl<EmailTemplateFormRawValue['attachments']>;
  attachmentsContentType: FormControl<EmailTemplateFormRawValue['attachmentsContentType']>;
};

export type EmailTemplateFormGroup = FormGroup<EmailTemplateFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EmailTemplateFormService {
  createEmailTemplateFormGroup(emailTemplate: EmailTemplateFormGroupInput = { id: null }): EmailTemplateFormGroup {
    const emailTemplateRawValue = this.convertEmailTemplateToEmailTemplateRawValue({
      ...this.getFormDefaults(),
      ...emailTemplate,
    });
    return new FormGroup<EmailTemplateFormGroupContent>({
      id: new FormControl(
        { value: emailTemplateRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      templateName: new FormControl(emailTemplateRawValue.templateName),
      emailSubject: new FormControl(emailTemplateRawValue.emailSubject),
      templateContent: new FormControl(emailTemplateRawValue.templateContent),
      tempType: new FormControl(emailTemplateRawValue.tempType),
      htmlContent: new FormControl(emailTemplateRawValue.htmlContent),
      useCount: new FormControl(emailTemplateRawValue.useCount),
      createdAt: new FormControl(emailTemplateRawValue.createdAt),
      attachments: new FormControl(emailTemplateRawValue.attachments),
      attachmentsContentType: new FormControl(emailTemplateRawValue.attachmentsContentType),
    });
  }

  getEmailTemplate(form: EmailTemplateFormGroup): IEmailTemplate | NewEmailTemplate {
    return this.convertEmailTemplateRawValueToEmailTemplate(form.getRawValue() as EmailTemplateFormRawValue | NewEmailTemplateFormRawValue);
  }

  resetForm(form: EmailTemplateFormGroup, emailTemplate: EmailTemplateFormGroupInput): void {
    const emailTemplateRawValue = this.convertEmailTemplateToEmailTemplateRawValue({ ...this.getFormDefaults(), ...emailTemplate });
    form.reset(
      {
        ...emailTemplateRawValue,
        id: { value: emailTemplateRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EmailTemplateFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
    };
  }

  private convertEmailTemplateRawValueToEmailTemplate(
    rawEmailTemplate: EmailTemplateFormRawValue | NewEmailTemplateFormRawValue
  ): IEmailTemplate | NewEmailTemplate {
    return {
      ...rawEmailTemplate,
      createdAt: dayjs(rawEmailTemplate.createdAt, DATE_TIME_FORMAT),
    };
  }

  private convertEmailTemplateToEmailTemplateRawValue(
    emailTemplate: IEmailTemplate | (Partial<NewEmailTemplate> & EmailTemplateFormDefaults)
  ): EmailTemplateFormRawValue | PartialWithRequiredKeyOf<NewEmailTemplateFormRawValue> {
    return {
      ...emailTemplate,
      createdAt: emailTemplate.createdAt ? emailTemplate.createdAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
