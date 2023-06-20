import { IProjectStatus, NewProjectStatus } from './project-status.model';

export const sampleWithRequiredData: IProjectStatus = {
  id: 65432,
};

export const sampleWithPartialData: IProjectStatus = {
  id: 46225,
};

export const sampleWithFullData: IProjectStatus = {
  id: 27665,
  stName: 'Convertible fuchsia',
};

export const sampleWithNewData: NewProjectStatus = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
