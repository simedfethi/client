import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrmDocumentLine, NewCrmDocumentLine } from '../crm-document-line.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrmDocumentLine for edit and NewCrmDocumentLineFormGroupInput for create.
 */
type CrmDocumentLineFormGroupInput = ICrmDocumentLine | PartialWithRequiredKeyOf<NewCrmDocumentLine>;

type CrmDocumentLineFormDefaults = Pick<NewCrmDocumentLine, 'id'>;

type CrmDocumentLineFormGroupContent = {
  id: FormControl<ICrmDocumentLine['id'] | NewCrmDocumentLine['id']>;
  lignePos: FormControl<ICrmDocumentLine['lignePos']>;
  itemRef: FormControl<ICrmDocumentLine['itemRef']>;
  itemDescription: FormControl<ICrmDocumentLine['itemDescription']>;
  qte: FormControl<ICrmDocumentLine['qte']>;
  qteExpedited: FormControl<ICrmDocumentLine['qteExpedited']>;
  unitPrice: FormControl<ICrmDocumentLine['unitPrice']>;
  reductionPercent: FormControl<ICrmDocumentLine['reductionPercent']>;
  unitPriceNet: FormControl<ICrmDocumentLine['unitPriceNet']>;
  reductionAmount: FormControl<ICrmDocumentLine['reductionAmount']>;
  taxPercent: FormControl<ICrmDocumentLine['taxPercent']>;
  totalht: FormControl<ICrmDocumentLine['totalht']>;
  totalttc: FormControl<ICrmDocumentLine['totalttc']>;
  unite: FormControl<ICrmDocumentLine['unite']>;
  sourceAprov: FormControl<ICrmDocumentLine['sourceAprov']>;
  produit: FormControl<ICrmDocumentLine['produit']>;
  crmDocument: FormControl<ICrmDocumentLine['crmDocument']>;
};

export type CrmDocumentLineFormGroup = FormGroup<CrmDocumentLineFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrmDocumentLineFormService {
  createCrmDocumentLineFormGroup(crmDocumentLine: CrmDocumentLineFormGroupInput = { id: null }): CrmDocumentLineFormGroup {
    const crmDocumentLineRawValue = {
      ...this.getFormDefaults(),
      ...crmDocumentLine,
    };
    return new FormGroup<CrmDocumentLineFormGroupContent>({
      id: new FormControl(
        { value: crmDocumentLineRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      lignePos: new FormControl(crmDocumentLineRawValue.lignePos),
      itemRef: new FormControl(crmDocumentLineRawValue.itemRef, {
        validators: [Validators.maxLength(50)],
      }),
      itemDescription: new FormControl(crmDocumentLineRawValue.itemDescription, {
        validators: [Validators.maxLength(50)],
      }),
      qte: new FormControl(crmDocumentLineRawValue.qte),
      qteExpedited: new FormControl(crmDocumentLineRawValue.qteExpedited),
      unitPrice: new FormControl(crmDocumentLineRawValue.unitPrice),
      reductionPercent: new FormControl(crmDocumentLineRawValue.reductionPercent),
      unitPriceNet: new FormControl(crmDocumentLineRawValue.unitPriceNet),
      reductionAmount: new FormControl(crmDocumentLineRawValue.reductionAmount),
      taxPercent: new FormControl(crmDocumentLineRawValue.taxPercent),
      totalht: new FormControl(crmDocumentLineRawValue.totalht),
      totalttc: new FormControl(crmDocumentLineRawValue.totalttc),
      unite: new FormControl(crmDocumentLineRawValue.unite),
      sourceAprov: new FormControl(crmDocumentLineRawValue.sourceAprov),
      produit: new FormControl(crmDocumentLineRawValue.produit),
      crmDocument: new FormControl(crmDocumentLineRawValue.crmDocument),
    });
  }

  getCrmDocumentLine(form: CrmDocumentLineFormGroup): ICrmDocumentLine | NewCrmDocumentLine {
    return form.getRawValue() as ICrmDocumentLine | NewCrmDocumentLine;
  }

  resetForm(form: CrmDocumentLineFormGroup, crmDocumentLine: CrmDocumentLineFormGroupInput): void {
    const crmDocumentLineRawValue = { ...this.getFormDefaults(), ...crmDocumentLine };
    form.reset(
      {
        ...crmDocumentLineRawValue,
        id: { value: crmDocumentLineRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrmDocumentLineFormDefaults {
    return {
      id: null,
    };
  }
}
