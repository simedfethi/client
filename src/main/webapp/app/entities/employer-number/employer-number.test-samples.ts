import { IEmployerNumber, NewEmployerNumber } from './employer-number.model';

export const sampleWithRequiredData: IEmployerNumber = {
  id: 38573,
};

export const sampleWithPartialData: IEmployerNumber = {
  id: 67225,
};

export const sampleWithFullData: IEmployerNumber = {
  id: 31173,
  emplNumber: 'reboot Object-based generate',
};

export const sampleWithNewData: NewEmployerNumber = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
