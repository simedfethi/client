import { ICrmDaira, NewCrmDaira } from './crm-daira.model';

export const sampleWithRequiredData: ICrmDaira = {
  id: 31553,
};

export const sampleWithPartialData: ICrmDaira = {
  id: 60213,
  dairaName: 'Awesome connect Global',
};

export const sampleWithFullData: ICrmDaira = {
  id: 88958,
  dairaName: 'Synergistic',
};

export const sampleWithNewData: NewCrmDaira = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
