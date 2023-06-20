import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICrmContact, NewCrmContact } from '../crm-contact.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrmContact for edit and NewCrmContactFormGroupInput for create.
 */
type CrmContactFormGroupInput = ICrmContact | PartialWithRequiredKeyOf<NewCrmContact>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICrmContact | NewCrmContact> = Omit<T, 'createdTime' | 'lastUpdate'> & {
  createdTime?: string | null;
  lastUpdate?: string | null;
};

type CrmContactFormRawValue = FormValueOf<ICrmContact>;

type NewCrmContactFormRawValue = FormValueOf<NewCrmContact>;

type CrmContactFormDefaults = Pick<NewCrmContact, 'id' | 'createdTime' | 'lastUpdate' | 'transactionCRMS' | 'customers'>;

type CrmContactFormGroupContent = {
  id: FormControl<CrmContactFormRawValue['id'] | NewCrmContact['id']>;
  lastName: FormControl<CrmContactFormRawValue['lastName']>;
  firstName: FormControl<CrmContactFormRawValue['firstName']>;
  emailAddress: FormControl<CrmContactFormRawValue['emailAddress']>;
  jobTitle: FormControl<CrmContactFormRawValue['jobTitle']>;
  contactJob: FormControl<CrmContactFormRawValue['contactJob']>;
  businessPhone: FormControl<CrmContactFormRawValue['businessPhone']>;
  homePhone: FormControl<CrmContactFormRawValue['homePhone']>;
  mobilePhone: FormControl<CrmContactFormRawValue['mobilePhone']>;
  faxNumber: FormControl<CrmContactFormRawValue['faxNumber']>;
  addresse: FormControl<CrmContactFormRawValue['addresse']>;
  naissanceDate: FormControl<CrmContactFormRawValue['naissanceDate']>;
  photo: FormControl<CrmContactFormRawValue['photo']>;
  photoContentType: FormControl<CrmContactFormRawValue['photoContentType']>;
  wilaya: FormControl<CrmContactFormRawValue['wilaya']>;
  daira: FormControl<CrmContactFormRawValue['daira']>;
  codePostal: FormControl<CrmContactFormRawValue['codePostal']>;
  commune: FormControl<CrmContactFormRawValue['commune']>;
  pays: FormControl<CrmContactFormRawValue['pays']>;
  webPage: FormControl<CrmContactFormRawValue['webPage']>;
  aboutSource: FormControl<CrmContactFormRawValue['aboutSource']>;
  notes: FormControl<CrmContactFormRawValue['notes']>;
  createdTime: FormControl<CrmContactFormRawValue['createdTime']>;
  lastUpdate: FormControl<CrmContactFormRawValue['lastUpdate']>;
  contacttype: FormControl<CrmContactFormRawValue['contacttype']>;
  crmContactSource: FormControl<CrmContactFormRawValue['crmContactSource']>;
  responsable: FormControl<CrmContactFormRawValue['responsable']>;
  societe: FormControl<CrmContactFormRawValue['societe']>;
  transactionCRMS: FormControl<CrmContactFormRawValue['transactionCRMS']>;
  customers: FormControl<CrmContactFormRawValue['customers']>;
};

export type CrmContactFormGroup = FormGroup<CrmContactFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrmContactFormService {
  createCrmContactFormGroup(crmContact: CrmContactFormGroupInput = { id: null }): CrmContactFormGroup {
    const crmContactRawValue = this.convertCrmContactToCrmContactRawValue({
      ...this.getFormDefaults(),
      ...crmContact,
    });
    return new FormGroup<CrmContactFormGroupContent>({
      id: new FormControl(
        { value: crmContactRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      lastName: new FormControl(crmContactRawValue.lastName, {
        validators: [Validators.maxLength(50)],
      }),
      firstName: new FormControl(crmContactRawValue.firstName, {
        validators: [Validators.maxLength(50)],
      }),
      emailAddress: new FormControl(crmContactRawValue.emailAddress, {
        validators: [Validators.maxLength(50)],
      }),
      jobTitle: new FormControl(crmContactRawValue.jobTitle, {
        validators: [Validators.maxLength(50)],
      }),
      contactJob: new FormControl(crmContactRawValue.contactJob),
      businessPhone: new FormControl(crmContactRawValue.businessPhone, {
        validators: [Validators.maxLength(25)],
      }),
      homePhone: new FormControl(crmContactRawValue.homePhone, {
        validators: [Validators.maxLength(25)],
      }),
      mobilePhone: new FormControl(crmContactRawValue.mobilePhone, {
        validators: [Validators.maxLength(25)],
      }),
      faxNumber: new FormControl(crmContactRawValue.faxNumber, {
        validators: [Validators.maxLength(25)],
      }),
      addresse: new FormControl(crmContactRawValue.addresse),
      naissanceDate: new FormControl(crmContactRawValue.naissanceDate),
      photo: new FormControl(crmContactRawValue.photo),
      photoContentType: new FormControl(crmContactRawValue.photoContentType),
      wilaya: new FormControl(crmContactRawValue.wilaya, {
        validators: [Validators.maxLength(50)],
      }),
      daira: new FormControl(crmContactRawValue.daira, {
        validators: [Validators.maxLength(50)],
      }),
      codePostal: new FormControl(crmContactRawValue.codePostal, {
        validators: [Validators.maxLength(15)],
      }),
      commune: new FormControl(crmContactRawValue.commune, {
        validators: [Validators.maxLength(50)],
      }),
      pays: new FormControl(crmContactRawValue.pays, {
        validators: [Validators.maxLength(50)],
      }),
      webPage: new FormControl(crmContactRawValue.webPage),
      aboutSource: new FormControl(crmContactRawValue.aboutSource),
      notes: new FormControl(crmContactRawValue.notes),
      createdTime: new FormControl(crmContactRawValue.createdTime),
      lastUpdate: new FormControl(crmContactRawValue.lastUpdate),
      contacttype: new FormControl(crmContactRawValue.contacttype),
      crmContactSource: new FormControl(crmContactRawValue.crmContactSource),
      responsable: new FormControl(crmContactRawValue.responsable),
      societe: new FormControl(crmContactRawValue.societe),
      transactionCRMS: new FormControl(crmContactRawValue.transactionCRMS ?? []),
      customers: new FormControl(crmContactRawValue.customers ?? []),
    });
  }

  getCrmContact(form: CrmContactFormGroup): ICrmContact | NewCrmContact {
    return this.convertCrmContactRawValueToCrmContact(form.getRawValue() as CrmContactFormRawValue | NewCrmContactFormRawValue);
  }

  resetForm(form: CrmContactFormGroup, crmContact: CrmContactFormGroupInput): void {
    const crmContactRawValue = this.convertCrmContactToCrmContactRawValue({ ...this.getFormDefaults(), ...crmContact });
    form.reset(
      {
        ...crmContactRawValue,
        id: { value: crmContactRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrmContactFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdTime: currentTime,
      lastUpdate: currentTime,
      transactionCRMS: [],
      customers: [],
    };
  }

  private convertCrmContactRawValueToCrmContact(
    rawCrmContact: CrmContactFormRawValue | NewCrmContactFormRawValue
  ): ICrmContact | NewCrmContact {
    return {
      ...rawCrmContact,
      createdTime: dayjs(rawCrmContact.createdTime, DATE_TIME_FORMAT),
      lastUpdate: dayjs(rawCrmContact.lastUpdate, DATE_TIME_FORMAT),
    };
  }

  private convertCrmContactToCrmContactRawValue(
    crmContact: ICrmContact | (Partial<NewCrmContact> & CrmContactFormDefaults)
  ): CrmContactFormRawValue | PartialWithRequiredKeyOf<NewCrmContactFormRawValue> {
    return {
      ...crmContact,
      createdTime: crmContact.createdTime ? crmContact.createdTime.format(DATE_TIME_FORMAT) : undefined,
      lastUpdate: crmContact.lastUpdate ? crmContact.lastUpdate.format(DATE_TIME_FORMAT) : undefined,
      transactionCRMS: crmContact.transactionCRMS ?? [],
      customers: crmContact.customers ?? [],
    };
  }
}
