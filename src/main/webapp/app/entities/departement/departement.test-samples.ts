import { IDepartement, NewDepartement } from './departement.model';

export const sampleWithRequiredData: IDepartement = {
  id: 86141,
};

export const sampleWithPartialData: IDepartement = {
  id: 29170,
  departmentName: 'Chips Balboa',
};

export const sampleWithFullData: IDepartement = {
  id: 67205,
  departmentName: 'quantify aggregate primary',
  departmentCode: 'recontextu',
};

export const sampleWithNewData: NewDepartement = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
