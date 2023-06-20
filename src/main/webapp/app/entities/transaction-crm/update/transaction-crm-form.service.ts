import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITransactionCRM, NewTransactionCRM } from '../transaction-crm.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITransactionCRM for edit and NewTransactionCRMFormGroupInput for create.
 */
type TransactionCRMFormGroupInput = ITransactionCRM | PartialWithRequiredKeyOf<NewTransactionCRM>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITransactionCRM | NewTransactionCRM> = Omit<T, 'creeLe' | 'dernierUpdate' | 'lastActivity' | 'etapeDepuis'> & {
  creeLe?: string | null;
  dernierUpdate?: string | null;
  lastActivity?: string | null;
  etapeDepuis?: string | null;
};

type TransactionCRMFormRawValue = FormValueOf<ITransactionCRM>;

type NewTransactionCRMFormRawValue = FormValueOf<NewTransactionCRM>;

type TransactionCRMFormDefaults = Pick<
  NewTransactionCRM,
  'id' | 'transactionRecurrente' | 'creeLe' | 'dernierUpdate' | 'trValidated' | 'lastActivity' | 'etapeDepuis' | 'crmContacts'
  >;

type TransactionCRMFormGroupContent = {
  id: FormControl<TransactionCRMFormRawValue['id'] | NewTransactionCRM['id']>;
  reference: FormControl<TransactionCRMFormRawValue['reference']>;
  montant: FormControl<TransactionCRMFormRawValue['montant']>;
  qteAnnuelle: FormControl<TransactionCRMFormRawValue['qteAnnuelle']>;
  dateFin: FormControl<TransactionCRMFormRawValue['dateFin']>;
  transactionRecurrente: FormControl<TransactionCRMFormRawValue['transactionRecurrente']>;
  intituleAffaire: FormControl<TransactionCRMFormRawValue['intituleAffaire']>;
  creeLe: FormControl<TransactionCRMFormRawValue['creeLe']>;
  dernierUpdate: FormControl<TransactionCRMFormRawValue['dernierUpdate']>;
  telephone: FormControl<TransactionCRMFormRawValue['telephone']>;
  source: FormControl<TransactionCRMFormRawValue['source']>;
  adresse: FormControl<TransactionCRMFormRawValue['adresse']>;
  notes: FormControl<TransactionCRMFormRawValue['notes']>;
  locationUrl: FormControl<TransactionCRMFormRawValue['locationUrl']>;
  latitude: FormControl<TransactionCRMFormRawValue['latitude']>;
  longitude: FormControl<TransactionCRMFormRawValue['longitude']>;
  trValidated: FormControl<TransactionCRMFormRawValue['trValidated']>;
  attachments: FormControl<TransactionCRMFormRawValue['attachments']>;
  attachmentsContentType: FormControl<TransactionCRMFormRawValue['attachmentsContentType']>;
  wilaya: FormControl<TransactionCRMFormRawValue['wilaya']>;
  daira: FormControl<TransactionCRMFormRawValue['daira']>;
  commune: FormControl<TransactionCRMFormRawValue['commune']>;
  lastActivity: FormControl<TransactionCRMFormRawValue['lastActivity']>;
  delai: FormControl<TransactionCRMFormRawValue['delai']>;
  etapeDepuis: FormControl<TransactionCRMFormRawValue['etapeDepuis']>;
  avancement: FormControl<TransactionCRMFormRawValue['avancement']>;
  trStatus: FormControl<TransactionCRMFormRawValue['trStatus']>;
  monnaie: FormControl<TransactionCRMFormRawValue['monnaie']>;
  trEtape: FormControl<TransactionCRMFormRawValue['trEtape']>;
  chargeAffaire: FormControl<TransactionCRMFormRawValue['chargeAffaire']>;
  client: FormControl<TransactionCRMFormRawValue['client']>;
  crmContacts: FormControl<TransactionCRMFormRawValue['crmContacts']>;
};

export type TransactionCRMFormGroup = FormGroup<TransactionCRMFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TransactionCRMFormService {
  createTransactionCRMFormGroup(transactionCRM: TransactionCRMFormGroupInput = { id: null }): TransactionCRMFormGroup {
    const transactionCRMRawValue = this.convertTransactionCRMToTransactionCRMRawValue({
      ...this.getFormDefaults(),
      ...transactionCRM,
    });
    return new FormGroup<TransactionCRMFormGroupContent>({
      id: new FormControl(
        { value: transactionCRMRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reference: new FormControl(transactionCRMRawValue.reference),
      montant: new FormControl(transactionCRMRawValue.montant),
      qteAnnuelle: new FormControl(transactionCRMRawValue.qteAnnuelle),
      dateFin: new FormControl(transactionCRMRawValue.dateFin),
      transactionRecurrente: new FormControl(transactionCRMRawValue.transactionRecurrente),
      intituleAffaire: new FormControl(transactionCRMRawValue.intituleAffaire),
      creeLe: new FormControl(transactionCRMRawValue.creeLe),
      dernierUpdate: new FormControl(transactionCRMRawValue.dernierUpdate),
      telephone: new FormControl(transactionCRMRawValue.telephone),
      source: new FormControl(transactionCRMRawValue.source),
      adresse: new FormControl(transactionCRMRawValue.adresse),
      notes: new FormControl(transactionCRMRawValue.notes),
      locationUrl: new FormControl(transactionCRMRawValue.locationUrl),
      latitude: new FormControl(transactionCRMRawValue.latitude),
      longitude: new FormControl(transactionCRMRawValue.longitude),
      trValidated: new FormControl(transactionCRMRawValue.trValidated),
      attachments: new FormControl(transactionCRMRawValue.attachments),
      attachmentsContentType: new FormControl(transactionCRMRawValue.attachmentsContentType),
      wilaya: new FormControl(transactionCRMRawValue.wilaya),
      daira: new FormControl(transactionCRMRawValue.daira),
      commune: new FormControl(transactionCRMRawValue.commune),
      lastActivity: new FormControl(transactionCRMRawValue.lastActivity),
      delai: new FormControl(transactionCRMRawValue.delai),
      etapeDepuis: new FormControl(transactionCRMRawValue.etapeDepuis),
      avancement: new FormControl(transactionCRMRawValue.avancement),
      trStatus: new FormControl(transactionCRMRawValue.trStatus),
      monnaie: new FormControl(transactionCRMRawValue.monnaie),
      trEtape: new FormControl(transactionCRMRawValue.trEtape),
      chargeAffaire: new FormControl(transactionCRMRawValue.chargeAffaire),
      client: new FormControl(transactionCRMRawValue.client),
      crmContacts: new FormControl(transactionCRMRawValue.crmContacts ?? []),
    });
  }

  getTransactionCRM(form: TransactionCRMFormGroup): ITransactionCRM | NewTransactionCRM {
    return this.convertTransactionCRMRawValueToTransactionCRM(
      form.getRawValue() as TransactionCRMFormRawValue | NewTransactionCRMFormRawValue
    );
  }

  resetForm(form: TransactionCRMFormGroup, transactionCRM: TransactionCRMFormGroupInput): void {
    const transactionCRMRawValue = this.convertTransactionCRMToTransactionCRMRawValue({ ...this.getFormDefaults(), ...transactionCRM });
    form.reset(
      {
        ...transactionCRMRawValue,
        id: { value: transactionCRMRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TransactionCRMFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      transactionRecurrente: false,
      creeLe: currentTime,
      dernierUpdate: currentTime,
      trValidated: false,
      lastActivity: currentTime,
      etapeDepuis: currentTime,
      crmContacts: [],
    };
  }

  private convertTransactionCRMRawValueToTransactionCRM(
    rawTransactionCRM: TransactionCRMFormRawValue | NewTransactionCRMFormRawValue
  ): ITransactionCRM | NewTransactionCRM {
    return {
      ...rawTransactionCRM,
      creeLe: dayjs(rawTransactionCRM.creeLe, DATE_TIME_FORMAT),
      dernierUpdate: dayjs(rawTransactionCRM.dernierUpdate, DATE_TIME_FORMAT),
      lastActivity: dayjs(rawTransactionCRM.lastActivity, DATE_TIME_FORMAT),
      etapeDepuis: dayjs(rawTransactionCRM.etapeDepuis, DATE_TIME_FORMAT),
    };
  }

  private convertTransactionCRMToTransactionCRMRawValue(
    transactionCRM: ITransactionCRM | (Partial<NewTransactionCRM> & TransactionCRMFormDefaults)
  ): TransactionCRMFormRawValue | PartialWithRequiredKeyOf<NewTransactionCRMFormRawValue> {
    return {
      ...transactionCRM,
      creeLe: transactionCRM.creeLe ? transactionCRM.creeLe.format(DATE_TIME_FORMAT) : undefined,
      dernierUpdate: transactionCRM.dernierUpdate ? transactionCRM.dernierUpdate.format(DATE_TIME_FORMAT) : undefined,
      lastActivity: transactionCRM.lastActivity ? transactionCRM.lastActivity.format(DATE_TIME_FORMAT) : undefined,
      etapeDepuis: transactionCRM.etapeDepuis ? transactionCRM.etapeDepuis.format(DATE_TIME_FORMAT) : undefined,
      crmContacts: transactionCRM.crmContacts ?? [],
    };
  }
}
