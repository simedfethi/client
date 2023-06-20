import { ICrmCommune, NewCrmCommune } from './crm-commune.model';

export const sampleWithRequiredData: ICrmCommune = {
  id: 48201,
};

export const sampleWithPartialData: ICrmCommune = {
  id: 59495,
  communeName: 'Account',
};

export const sampleWithFullData: ICrmCommune = {
  id: 95577,
  communeName: 'Avon parsing Row',
};

export const sampleWithNewData: NewCrmCommune = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
