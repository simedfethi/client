import dayjs from 'dayjs/esm';

import { ICrmDocument, NewCrmDocument } from './crm-document.model';

export const sampleWithRequiredData: ICrmDocument = {
  id: 6244,
};

export const sampleWithPartialData: ICrmDocument = {
  id: 86513,
  cretedDate: dayjs('2023-04-17T09:06'),
  totalPrice: 57475,
  reductionPercent: 65773,
  shipping: 50369,
  taxPrice: 1611,
  netPrice: 7768,
};

export const sampleWithFullData: ICrmDocument = {
  id: 27400,
  documentname: 'AI Orchestrator Industrial',
  docnumber: 'Gardens Checking red',
  docnotes: '../fake-data/blob/hipster.txt',
  cretedDate: dayjs('2023-04-17T00:46'),
  updateDate: dayjs('2023-04-17T11:45'),
  totalPrice: 10762,
  reductionPercent: 76386,
  reductionAmount: 57143,
  shipping: 21055,
  taxPrice: 99860,
  netPrice: 36607,
};

export const sampleWithNewData: NewCrmDocument = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
