import { ICrmAvancement, NewCrmAvancement } from './crm-avancement.model';

export const sampleWithRequiredData: ICrmAvancement = {
  id: 45162,
};

export const sampleWithPartialData: ICrmAvancement = {
  id: 7260,
  avanName: 'recontextualize transmitting Chief',
};

export const sampleWithFullData: ICrmAvancement = {
  id: 30876,
  avanName: 'Illinois',
};

export const sampleWithNewData: NewCrmAvancement = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
