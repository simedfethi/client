import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICrmDocument, NewCrmDocument } from '../crm-document.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrmDocument for edit and NewCrmDocumentFormGroupInput for create.
 */
type CrmDocumentFormGroupInput = ICrmDocument | PartialWithRequiredKeyOf<NewCrmDocument>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICrmDocument | NewCrmDocument> = Omit<T, 'cretedDate' | 'updateDate'> & {
  cretedDate?: string | null;
  updateDate?: string | null;
};

type CrmDocumentFormRawValue = FormValueOf<ICrmDocument>;

type NewCrmDocumentFormRawValue = FormValueOf<NewCrmDocument>;

type CrmDocumentFormDefaults = Pick<NewCrmDocument, 'id' | 'cretedDate' | 'updateDate'>;

type CrmDocumentFormGroupContent = {
  id: FormControl<CrmDocumentFormRawValue['id'] | NewCrmDocument['id']>;
  documentname: FormControl<CrmDocumentFormRawValue['documentname']>;
  docnumber: FormControl<CrmDocumentFormRawValue['docnumber']>;
  docnotes: FormControl<CrmDocumentFormRawValue['docnotes']>;
  cretedDate: FormControl<CrmDocumentFormRawValue['cretedDate']>;
  updateDate: FormControl<CrmDocumentFormRawValue['updateDate']>;
  totalPrice: FormControl<CrmDocumentFormRawValue['totalPrice']>;
  reductionPercent: FormControl<CrmDocumentFormRawValue['reductionPercent']>;
  reductionAmount: FormControl<CrmDocumentFormRawValue['reductionAmount']>;
  shipping: FormControl<CrmDocumentFormRawValue['shipping']>;
  taxPrice: FormControl<CrmDocumentFormRawValue['taxPrice']>;
  netPrice: FormControl<CrmDocumentFormRawValue['netPrice']>;
  transporteur: FormControl<CrmDocumentFormRawValue['transporteur']>;
  transportunit: FormControl<CrmDocumentFormRawValue['transportunit']>;
  crmdoctype: FormControl<CrmDocumentFormRawValue['crmdoctype']>;
  createdBy: FormControl<CrmDocumentFormRawValue['createdBy']>;
  customer: FormControl<CrmDocumentFormRawValue['customer']>;
  crmContact: FormControl<CrmDocumentFormRawValue['crmContact']>;
  transactionCRM: FormControl<CrmDocumentFormRawValue['transactionCRM']>;
};

export type CrmDocumentFormGroup = FormGroup<CrmDocumentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrmDocumentFormService {
  createCrmDocumentFormGroup(crmDocument: CrmDocumentFormGroupInput = { id: null }): CrmDocumentFormGroup {
    const crmDocumentRawValue = this.convertCrmDocumentToCrmDocumentRawValue({
      ...this.getFormDefaults(),
      ...crmDocument,
    });
    return new FormGroup<CrmDocumentFormGroupContent>({
      id: new FormControl(
        { value: crmDocumentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      documentname: new FormControl(crmDocumentRawValue.documentname),
      docnumber: new FormControl(crmDocumentRawValue.docnumber),
      docnotes: new FormControl(crmDocumentRawValue.docnotes),
      cretedDate: new FormControl(crmDocumentRawValue.cretedDate),
      updateDate: new FormControl(crmDocumentRawValue.updateDate),
      totalPrice: new FormControl(crmDocumentRawValue.totalPrice),
      reductionPercent: new FormControl(crmDocumentRawValue.reductionPercent),
      reductionAmount: new FormControl(crmDocumentRawValue.reductionAmount),
      shipping: new FormControl(crmDocumentRawValue.shipping),
      taxPrice: new FormControl(crmDocumentRawValue.taxPrice),
      netPrice: new FormControl(crmDocumentRawValue.netPrice),
      transporteur: new FormControl(crmDocumentRawValue.transporteur),
      transportunit: new FormControl(crmDocumentRawValue.transportunit),
      crmdoctype: new FormControl(crmDocumentRawValue.crmdoctype),
      createdBy: new FormControl(crmDocumentRawValue.createdBy),
      customer: new FormControl(crmDocumentRawValue.customer),
      crmContact: new FormControl(crmDocumentRawValue.crmContact),
      transactionCRM: new FormControl(crmDocumentRawValue.transactionCRM),
    });
  }

  getCrmDocument(form: CrmDocumentFormGroup): ICrmDocument | NewCrmDocument {
    return this.convertCrmDocumentRawValueToCrmDocument(form.getRawValue() as CrmDocumentFormRawValue | NewCrmDocumentFormRawValue);
  }

  resetForm(form: CrmDocumentFormGroup, crmDocument: CrmDocumentFormGroupInput): void {
    const crmDocumentRawValue = this.convertCrmDocumentToCrmDocumentRawValue({ ...this.getFormDefaults(), ...crmDocument });
    form.reset(
      {
        ...crmDocumentRawValue,
        id: { value: crmDocumentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrmDocumentFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      cretedDate: currentTime,
      updateDate: currentTime,
    };
  }

  private convertCrmDocumentRawValueToCrmDocument(
    rawCrmDocument: CrmDocumentFormRawValue | NewCrmDocumentFormRawValue
  ): ICrmDocument | NewCrmDocument {
    return {
      ...rawCrmDocument,
      cretedDate: dayjs(rawCrmDocument.cretedDate, DATE_TIME_FORMAT),
      updateDate: dayjs(rawCrmDocument.updateDate, DATE_TIME_FORMAT),
    };
  }

  private convertCrmDocumentToCrmDocumentRawValue(
    crmDocument: ICrmDocument | (Partial<NewCrmDocument> & CrmDocumentFormDefaults)
  ): CrmDocumentFormRawValue | PartialWithRequiredKeyOf<NewCrmDocumentFormRawValue> {
    return {
      ...crmDocument,
      cretedDate: crmDocument.cretedDate ? crmDocument.cretedDate.format(DATE_TIME_FORMAT) : undefined,
      updateDate: crmDocument.updateDate ? crmDocument.updateDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
