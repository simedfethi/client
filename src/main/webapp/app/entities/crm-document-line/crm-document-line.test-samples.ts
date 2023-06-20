import { ICrmDocumentLine, NewCrmDocumentLine } from './crm-document-line.model';

export const sampleWithRequiredData: ICrmDocumentLine = {
  id: 18308,
};

export const sampleWithPartialData: ICrmDocumentLine = {
  id: 37238,
  qteExpedited: 79904,
  reductionPercent: 9410,
  taxPercent: 33476,
  totalttc: 43901,
};

export const sampleWithFullData: ICrmDocumentLine = {
  id: 19983,
  lignePos: 62571,
  itemRef: 'Specialist Handmade installation',
  itemDescription: 'blue Division',
  qte: 72207,
  qteExpedited: 70621,
  unitPrice: 68528,
  reductionPercent: 23465,
  unitPriceNet: 65259,
  reductionAmount: 88523,
  taxPercent: 18781,
  totalht: 28630,
  totalttc: 64349,
};

export const sampleWithNewData: NewCrmDocumentLine = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
