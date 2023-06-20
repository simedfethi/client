import dayjs from 'dayjs/esm';

import { TransactionEtape } from 'app/entities/enumerations/transaction-etape.model';
import { TransactionSource } from 'app/entities/enumerations/transaction-source.model';

import { ITransactionCRM, NewTransactionCRM } from './transaction-crm.model';

export const sampleWithRequiredData: ITransactionCRM = {
  id: 4718,
  montant: 80064,
};

export const sampleWithPartialData: ITransactionCRM = {
  id: 43558,
  montant: 74110,
  transactionEtape: TransactionEtape['FACTURE'],
  dateFin: dayjs('2022-12-14'),
  transactionRecurrente: false,
  creeLe: dayjs('2022-12-13T21:50'),
  dernierUpdate: dayjs('2022-12-14T07:48'),
  source: TransactionSource['SALON'],
  adresse: '../fake-data/blob/hipster.txt',
  latitude: 44575,
};

export const sampleWithFullData: ITransactionCRM = {
  id: 96358,
  reference: 'Directives Home maximize',
  montant: 4887,
  transactionEtape: TransactionEtape['NOUVEAU'],
  dateFin: dayjs('2022-12-14'),
  transactionRecurrente: false,
  creeLe: dayjs('2022-12-13T22:01'),
  dernierUpdate: dayjs('2022-12-14T10:10'),
  telephone: '(528) 261-9916',
  source: TransactionSource['WEBSITE'],
  adresse: '../fake-data/blob/hipster.txt',
  notes: '../fake-data/blob/hipster.txt',
  latitude: 79444,
  longitude: 82043,
};

export const sampleWithNewData: NewTransactionCRM = {
  montant: 43641,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
