import { ICrmRole, NewCrmRole } from './crm-role.model';

export const sampleWithRequiredData: ICrmRole = {
  id: 61798,
};

export const sampleWithPartialData: ICrmRole = {
  id: 14446,
};

export const sampleWithFullData: ICrmRole = {
  id: 60845,
  roleName: 'Configuration revolutionize Function-based',
  roleCode: 88251,
  roleDescription: 'lavender',
};

export const sampleWithNewData: NewCrmRole = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
