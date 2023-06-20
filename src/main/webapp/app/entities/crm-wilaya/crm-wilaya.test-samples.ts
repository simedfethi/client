import { ICrmWilaya, NewCrmWilaya } from './crm-wilaya.model';

export const sampleWithRequiredData: ICrmWilaya = {
  id: 79167,
};

export const sampleWithPartialData: ICrmWilaya = {
  id: 53656,
  wilayaName: 'Berkshire National Plastic',
};

export const sampleWithFullData: ICrmWilaya = {
  id: 57376,
  wilayaName: 'Fish Auto',
};

export const sampleWithNewData: NewCrmWilaya = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
