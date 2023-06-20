import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICustomer, NewCustomer } from '../customer.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICustomer for edit and NewCustomerFormGroupInput for create.
 */
type CustomerFormGroupInput = ICustomer | PartialWithRequiredKeyOf<NewCustomer>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICustomer | NewCustomer> = Omit<T, 'createdTime' | 'lastUpdate'> & {
  createdTime?: string | null;
  lastUpdate?: string | null;
};

type CustomerFormRawValue = FormValueOf<ICustomer>;

type NewCustomerFormRawValue = FormValueOf<NewCustomer>;

type CustomerFormDefaults = Pick<NewCustomer, 'id' | 'dejaClient' | 'createdTime' | 'lastUpdate' | 'crmContacts'>;

type CustomerFormGroupContent = {
  id: FormControl<CustomerFormRawValue['id'] | NewCustomer['id']>;
  customerType: FormControl<CustomerFormRawValue['customerType']>;
  company: FormControl<CustomerFormRawValue['company']>;
  emailAddress: FormControl<CustomerFormRawValue['emailAddress']>;
  businessPhone: FormControl<CustomerFormRawValue['businessPhone']>;
  mobilePhone: FormControl<CustomerFormRawValue['mobilePhone']>;
  faxNumber: FormControl<CustomerFormRawValue['faxNumber']>;
  caAnnual: FormControl<CustomerFormRawValue['caAnnual']>;
  addresse: FormControl<CustomerFormRawValue['addresse']>;
  wilaya: FormControl<CustomerFormRawValue['wilaya']>;
  daira: FormControl<CustomerFormRawValue['daira']>;
  codePostal: FormControl<CustomerFormRawValue['codePostal']>;
  commune: FormControl<CustomerFormRawValue['commune']>;
  webPage: FormControl<CustomerFormRawValue['webPage']>;
  notes: FormControl<CustomerFormRawValue['notes']>;
  attachments: FormControl<CustomerFormRawValue['attachments']>;
  attachmentsContentType: FormControl<CustomerFormRawValue['attachmentsContentType']>;
  aboutSource: FormControl<CustomerFormRawValue['aboutSource']>;
  dejaClient: FormControl<CustomerFormRawValue['dejaClient']>;
  createdTime: FormControl<CustomerFormRawValue['createdTime']>;
  lastUpdate: FormControl<CustomerFormRawValue['lastUpdate']>;
  latitude: FormControl<CustomerFormRawValue['latitude']>;
  longitude: FormControl<CustomerFormRawValue['longitude']>;
  logo: FormControl<CustomerFormRawValue['logo']>;
  logoContentType: FormControl<CustomerFormRawValue['logoContentType']>;
  commercial: FormControl<CustomerFormRawValue['commercial']>;
  customerSource: FormControl<CustomerFormRawValue['customerSource']>;
  nombreEmployee: FormControl<CustomerFormRawValue['nombreEmployee']>;
  categorie: FormControl<CustomerFormRawValue['categorie']>;
  caMonnaie: FormControl<CustomerFormRawValue['caMonnaie']>;
  crmContacts: FormControl<CustomerFormRawValue['crmContacts']>;
};

export type CustomerFormGroup = FormGroup<CustomerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CustomerFormService {
  createCustomerFormGroup(customer: CustomerFormGroupInput = { id: null }): CustomerFormGroup {
    const customerRawValue = this.convertCustomerToCustomerRawValue({
      ...this.getFormDefaults(),
      ...customer,
    });
    return new FormGroup<CustomerFormGroupContent>({
      id: new FormControl(
        { value: customerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      customerType: new FormControl(customerRawValue.customerType),
      company: new FormControl(customerRawValue.company, {
        validators: [Validators.maxLength(50)],
      }),
      emailAddress: new FormControl(customerRawValue.emailAddress, {
        validators: [Validators.maxLength(50)],
      }),
      businessPhone: new FormControl(customerRawValue.businessPhone, {
        validators: [Validators.maxLength(50)],
      }),
      mobilePhone: new FormControl(customerRawValue.mobilePhone, {
        validators: [Validators.maxLength(50)],
      }),
      faxNumber: new FormControl(customerRawValue.faxNumber, {
        validators: [Validators.maxLength(50)],
      }),
      caAnnual: new FormControl(customerRawValue.caAnnual),
      addresse: new FormControl(customerRawValue.addresse),
      wilaya: new FormControl(customerRawValue.wilaya, {
        validators: [Validators.maxLength(50)],
      }),
      daira: new FormControl(customerRawValue.daira, {
        validators: [Validators.maxLength(50)],
      }),
      codePostal: new FormControl(customerRawValue.codePostal, {
        validators: [Validators.maxLength(15)],
      }),
      commune: new FormControl(customerRawValue.commune, {
        validators: [Validators.maxLength(50)],
      }),
      webPage: new FormControl(customerRawValue.webPage),
      notes: new FormControl(customerRawValue.notes),
      attachments: new FormControl(customerRawValue.attachments),
      attachmentsContentType: new FormControl(customerRawValue.attachmentsContentType),
      aboutSource: new FormControl(customerRawValue.aboutSource),
      dejaClient: new FormControl(customerRawValue.dejaClient),
      createdTime: new FormControl(customerRawValue.createdTime),
      lastUpdate: new FormControl(customerRawValue.lastUpdate),
      latitude: new FormControl(customerRawValue.latitude),
      longitude: new FormControl(customerRawValue.longitude),
      logo: new FormControl(customerRawValue.logo),
      logoContentType: new FormControl(customerRawValue.logoContentType),
      commercial: new FormControl(customerRawValue.commercial),
      customerSource: new FormControl(customerRawValue.customerSource),
      nombreEmployee: new FormControl(customerRawValue.nombreEmployee),
      categorie: new FormControl(customerRawValue.categorie),
      caMonnaie: new FormControl(customerRawValue.caMonnaie),
      crmContacts: new FormControl(customerRawValue.crmContacts ?? []),
    });
  }

  getCustomer(form: CustomerFormGroup): ICustomer | NewCustomer {
    return this.convertCustomerRawValueToCustomer(form.getRawValue() as CustomerFormRawValue | NewCustomerFormRawValue);
  }

  resetForm(form: CustomerFormGroup, customer: CustomerFormGroupInput): void {
    const customerRawValue = this.convertCustomerToCustomerRawValue({ ...this.getFormDefaults(), ...customer });
    form.reset(
      {
        ...customerRawValue,
        id: { value: customerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CustomerFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dejaClient: false,
      createdTime: currentTime,
      lastUpdate: currentTime,
      crmContacts: [],
    };
  }

  private convertCustomerRawValueToCustomer(rawCustomer: CustomerFormRawValue | NewCustomerFormRawValue): ICustomer | NewCustomer {
    return {
      ...rawCustomer,
      createdTime: dayjs(rawCustomer.createdTime, DATE_TIME_FORMAT),
      lastUpdate: dayjs(rawCustomer.lastUpdate, DATE_TIME_FORMAT),
    };
  }

  private convertCustomerToCustomerRawValue(
    customer: ICustomer | (Partial<NewCustomer> & CustomerFormDefaults)
  ): CustomerFormRawValue | PartialWithRequiredKeyOf<NewCustomerFormRawValue> {
    return {
      ...customer,
      createdTime: customer.createdTime ? customer.createdTime.format(DATE_TIME_FORMAT) : undefined,
      lastUpdate: customer.lastUpdate ? customer.lastUpdate.format(DATE_TIME_FORMAT) : undefined,
      crmContacts: customer.crmContacts ?? [],
    };
  }
}
