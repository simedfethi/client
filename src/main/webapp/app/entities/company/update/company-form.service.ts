import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICompany, NewCompany } from '../company.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICompany for edit and NewCompanyFormGroupInput for create.
 */
type CompanyFormGroupInput = ICompany | PartialWithRequiredKeyOf<NewCompany>;

type CompanyFormDefaults = Pick<NewCompany, 'id'>;

type CompanyFormGroupContent = {
  id: FormControl<ICompany['id'] | NewCompany['id']>;
  company: FormControl<ICompany['company']>;
  lastName: FormControl<ICompany['lastName']>;
  firstName: FormControl<ICompany['firstName']>;
  emailAddress: FormControl<ICompany['emailAddress']>;
  jobTitle: FormControl<ICompany['jobTitle']>;
  businessPhone: FormControl<ICompany['businessPhone']>;
  homePhone: FormControl<ICompany['homePhone']>;
  mobilePhone: FormControl<ICompany['mobilePhone']>;
  faxNumber: FormControl<ICompany['faxNumber']>;
  address: FormControl<ICompany['address']>;
  city: FormControl<ICompany['city']>;
  stateProvince: FormControl<ICompany['stateProvince']>;
  zipPostalCode: FormControl<ICompany['zipPostalCode']>;
  countryRegion: FormControl<ICompany['countryRegion']>;
  webPage: FormControl<ICompany['webPage']>;
  notes: FormControl<ICompany['notes']>;
  attachments: FormControl<ICompany['attachments']>;
  attachmentsContentType: FormControl<ICompany['attachmentsContentType']>;
};

export type CompanyFormGroup = FormGroup<CompanyFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CompanyFormService {
  createCompanyFormGroup(company: CompanyFormGroupInput = { id: null }): CompanyFormGroup {
    const companyRawValue = {
      ...this.getFormDefaults(),
      ...company,
    };
    return new FormGroup<CompanyFormGroupContent>({
      id: new FormControl(
        { value: companyRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      company: new FormControl(companyRawValue.company, {
        validators: [Validators.maxLength(50)],
      }),
      lastName: new FormControl(companyRawValue.lastName, {
        validators: [Validators.maxLength(50)],
      }),
      firstName: new FormControl(companyRawValue.firstName, {
        validators: [Validators.maxLength(50)],
      }),
      emailAddress: new FormControl(companyRawValue.emailAddress, {
        validators: [Validators.maxLength(50)],
      }),
      jobTitle: new FormControl(companyRawValue.jobTitle, {
        validators: [Validators.maxLength(50)],
      }),
      businessPhone: new FormControl(companyRawValue.businessPhone, {
        validators: [Validators.maxLength(25)],
      }),
      homePhone: new FormControl(companyRawValue.homePhone, {
        validators: [Validators.maxLength(25)],
      }),
      mobilePhone: new FormControl(companyRawValue.mobilePhone, {
        validators: [Validators.maxLength(25)],
      }),
      faxNumber: new FormControl(companyRawValue.faxNumber, {
        validators: [Validators.maxLength(25)],
      }),
      address: new FormControl(companyRawValue.address),
      city: new FormControl(companyRawValue.city, {
        validators: [Validators.maxLength(50)],
      }),
      stateProvince: new FormControl(companyRawValue.stateProvince, {
        validators: [Validators.maxLength(50)],
      }),
      zipPostalCode: new FormControl(companyRawValue.zipPostalCode, {
        validators: [Validators.maxLength(15)],
      }),
      countryRegion: new FormControl(companyRawValue.countryRegion, {
        validators: [Validators.maxLength(50)],
      }),
      webPage: new FormControl(companyRawValue.webPage),
      notes: new FormControl(companyRawValue.notes),
      attachments: new FormControl(companyRawValue.attachments),
      attachmentsContentType: new FormControl(companyRawValue.attachmentsContentType),
    });
  }

  getCompany(form: CompanyFormGroup): ICompany | NewCompany {
    return form.getRawValue() as ICompany | NewCompany;
  }

  resetForm(form: CompanyFormGroup, company: CompanyFormGroupInput): void {
    const companyRawValue = { ...this.getFormDefaults(), ...company };
    form.reset(
      {
        ...companyRawValue,
        id: { value: companyRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CompanyFormDefaults {
    return {
      id: null,
    };
  }
}
