import { ICrmPermission, NewCrmPermission } from './crm-permission.model';

export const sampleWithRequiredData: ICrmPermission = {
  id: 24268,
};

export const sampleWithPartialData: ICrmPermission = {
  id: 89407,
  pName: 'ROI',
};

export const sampleWithFullData: ICrmPermission = {
  id: 62475,
  pName: 'indexing',
  pDescription: 'Auto',
};

export const sampleWithNewData: NewCrmPermission = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
