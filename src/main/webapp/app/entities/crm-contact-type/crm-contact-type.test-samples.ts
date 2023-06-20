import { ICrmContactType, NewCrmContactType } from './crm-contact-type.model';

export const sampleWithRequiredData: ICrmContactType = {
  id: 36849,
};

export const sampleWithPartialData: ICrmContactType = {
  id: 24862,
  contactType: 'compress interface methodologies',
};

export const sampleWithFullData: ICrmContactType = {
  id: 68125,
  contactType: 'withdrawal',
};

export const sampleWithNewData: NewCrmContactType = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
