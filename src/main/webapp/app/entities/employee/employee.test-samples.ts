import { Gender } from 'app/entities/enumerations/gender.model';

import { IEmployee, NewEmployee } from './employee.model';

export const sampleWithRequiredData: IEmployee = {
  id: 7813,
};

export const sampleWithPartialData: IEmployee = {
  id: 37115,
  gender: Gender['OTHER'],
  phone: '1-754-942-0159 x42842',
  emailAdress: 'internet Ville strategic',
};

export const sampleWithFullData: IEmployee = {
  id: 22575,
  employeeName: 'sensor',
  gender: Gender['OTHER'],
  phone: '(469) 644-9933 x81672',
  addressLine1: 'pixel French',
  emailAdress: 'Iranian embrace',
};

export const sampleWithNewData: NewEmployee = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
