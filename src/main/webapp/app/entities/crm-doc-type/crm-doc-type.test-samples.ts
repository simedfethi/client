import { ICrmDocType, NewCrmDocType } from './crm-doc-type.model';

export const sampleWithRequiredData: ICrmDocType = {
  id: 39272,
};

export const sampleWithPartialData: ICrmDocType = {
  id: 60858,
};

export const sampleWithFullData: ICrmDocType = {
  id: 87631,
  cdtname: 'secondary',
  cdtRef: 'Cotton Assurance',
};

export const sampleWithNewData: NewCrmDocType = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
