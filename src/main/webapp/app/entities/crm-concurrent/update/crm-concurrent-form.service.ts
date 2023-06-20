import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICrmConcurrent, NewCrmConcurrent } from '../crm-concurrent.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrmConcurrent for edit and NewCrmConcurrentFormGroupInput for create.
 */
type CrmConcurrentFormGroupInput = ICrmConcurrent | PartialWithRequiredKeyOf<NewCrmConcurrent>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICrmConcurrent | NewCrmConcurrent> = Omit<T, 'createdTime' | 'lastUpdate'> & {
  createdTime?: string | null;
  lastUpdate?: string | null;
};

type CrmConcurrentFormRawValue = FormValueOf<ICrmConcurrent>;

type NewCrmConcurrentFormRawValue = FormValueOf<NewCrmConcurrent>;

type CrmConcurrentFormDefaults = Pick<NewCrmConcurrent, 'id' | 'createdTime' | 'lastUpdate'>;

type CrmConcurrentFormGroupContent = {
  id: FormControl<CrmConcurrentFormRawValue['id'] | NewCrmConcurrent['id']>;
  customerType: FormControl<CrmConcurrentFormRawValue['customerType']>;
  company: FormControl<CrmConcurrentFormRawValue['company']>;
  emailAddress: FormControl<CrmConcurrentFormRawValue['emailAddress']>;
  businessPhone: FormControl<CrmConcurrentFormRawValue['businessPhone']>;
  mobilePhone: FormControl<CrmConcurrentFormRawValue['mobilePhone']>;
  faxNumber: FormControl<CrmConcurrentFormRawValue['faxNumber']>;
  caAnnual: FormControl<CrmConcurrentFormRawValue['caAnnual']>;
  addresse: FormControl<CrmConcurrentFormRawValue['addresse']>;
  wilaya: FormControl<CrmConcurrentFormRawValue['wilaya']>;
  daira: FormControl<CrmConcurrentFormRawValue['daira']>;
  codePostal: FormControl<CrmConcurrentFormRawValue['codePostal']>;
  commune: FormControl<CrmConcurrentFormRawValue['commune']>;
  webPage: FormControl<CrmConcurrentFormRawValue['webPage']>;
  notes: FormControl<CrmConcurrentFormRawValue['notes']>;
  attachments: FormControl<CrmConcurrentFormRawValue['attachments']>;
  attachmentsContentType: FormControl<CrmConcurrentFormRawValue['attachmentsContentType']>;
  aboutSource: FormControl<CrmConcurrentFormRawValue['aboutSource']>;
  createdTime: FormControl<CrmConcurrentFormRawValue['createdTime']>;
  lastUpdate: FormControl<CrmConcurrentFormRawValue['lastUpdate']>;
  latitude: FormControl<CrmConcurrentFormRawValue['latitude']>;
  longitude: FormControl<CrmConcurrentFormRawValue['longitude']>;
  logo: FormControl<CrmConcurrentFormRawValue['logo']>;
  logoContentType: FormControl<CrmConcurrentFormRawValue['logoContentType']>;
};

export type CrmConcurrentFormGroup = FormGroup<CrmConcurrentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrmConcurrentFormService {
  createCrmConcurrentFormGroup(crmConcurrent: CrmConcurrentFormGroupInput = { id: null }): CrmConcurrentFormGroup {
    const crmConcurrentRawValue = this.convertCrmConcurrentToCrmConcurrentRawValue({
      ...this.getFormDefaults(),
      ...crmConcurrent,
    });
    return new FormGroup<CrmConcurrentFormGroupContent>({
      id: new FormControl(
        { value: crmConcurrentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      customerType: new FormControl(crmConcurrentRawValue.customerType),
      company: new FormControl(crmConcurrentRawValue.company, {
        validators: [Validators.maxLength(50)],
      }),
      emailAddress: new FormControl(crmConcurrentRawValue.emailAddress, {
        validators: [Validators.maxLength(50)],
      }),
      businessPhone: new FormControl(crmConcurrentRawValue.businessPhone, {
        validators: [Validators.maxLength(50)],
      }),
      mobilePhone: new FormControl(crmConcurrentRawValue.mobilePhone, {
        validators: [Validators.maxLength(50)],
      }),
      faxNumber: new FormControl(crmConcurrentRawValue.faxNumber, {
        validators: [Validators.maxLength(50)],
      }),
      caAnnual: new FormControl(crmConcurrentRawValue.caAnnual),
      addresse: new FormControl(crmConcurrentRawValue.addresse),
      wilaya: new FormControl(crmConcurrentRawValue.wilaya, {
        validators: [Validators.maxLength(50)],
      }),
      daira: new FormControl(crmConcurrentRawValue.daira, {
        validators: [Validators.maxLength(50)],
      }),
      codePostal: new FormControl(crmConcurrentRawValue.codePostal, {
        validators: [Validators.maxLength(15)],
      }),
      commune: new FormControl(crmConcurrentRawValue.commune, {
        validators: [Validators.maxLength(50)],
      }),
      webPage: new FormControl(crmConcurrentRawValue.webPage),
      notes: new FormControl(crmConcurrentRawValue.notes),
      attachments: new FormControl(crmConcurrentRawValue.attachments),
      attachmentsContentType: new FormControl(crmConcurrentRawValue.attachmentsContentType),
      aboutSource: new FormControl(crmConcurrentRawValue.aboutSource),
      createdTime: new FormControl(crmConcurrentRawValue.createdTime),
      lastUpdate: new FormControl(crmConcurrentRawValue.lastUpdate),
      latitude: new FormControl(crmConcurrentRawValue.latitude),
      longitude: new FormControl(crmConcurrentRawValue.longitude),
      logo: new FormControl(crmConcurrentRawValue.logo),
      logoContentType: new FormControl(crmConcurrentRawValue.logoContentType),
    });
  }

  getCrmConcurrent(form: CrmConcurrentFormGroup): ICrmConcurrent | NewCrmConcurrent {
    return this.convertCrmConcurrentRawValueToCrmConcurrent(form.getRawValue() as CrmConcurrentFormRawValue | NewCrmConcurrentFormRawValue);
  }

  resetForm(form: CrmConcurrentFormGroup, crmConcurrent: CrmConcurrentFormGroupInput): void {
    const crmConcurrentRawValue = this.convertCrmConcurrentToCrmConcurrentRawValue({ ...this.getFormDefaults(), ...crmConcurrent });
    form.reset(
      {
        ...crmConcurrentRawValue,
        id: { value: crmConcurrentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrmConcurrentFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdTime: currentTime,
      lastUpdate: currentTime,
    };
  }

  private convertCrmConcurrentRawValueToCrmConcurrent(
    rawCrmConcurrent: CrmConcurrentFormRawValue | NewCrmConcurrentFormRawValue
  ): ICrmConcurrent | NewCrmConcurrent {
    return {
      ...rawCrmConcurrent,
      createdTime: dayjs(rawCrmConcurrent.createdTime, DATE_TIME_FORMAT),
      lastUpdate: dayjs(rawCrmConcurrent.lastUpdate, DATE_TIME_FORMAT),
    };
  }

  private convertCrmConcurrentToCrmConcurrentRawValue(
    crmConcurrent: ICrmConcurrent | (Partial<NewCrmConcurrent> & CrmConcurrentFormDefaults)
  ): CrmConcurrentFormRawValue | PartialWithRequiredKeyOf<NewCrmConcurrentFormRawValue> {
    return {
      ...crmConcurrent,
      createdTime: crmConcurrent.createdTime ? crmConcurrent.createdTime.format(DATE_TIME_FORMAT) : undefined,
      lastUpdate: crmConcurrent.lastUpdate ? crmConcurrent.lastUpdate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
