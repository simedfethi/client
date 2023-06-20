import dayjs from 'dayjs/esm';

import { ISupplier, NewSupplier } from './supplier.model';

export const sampleWithRequiredData: ISupplier = {
  id: 7333,
};

export const sampleWithPartialData: ISupplier = {
  id: 31535,
  companyName: 'Pizza enable',
  adresse: 'index cyan e-enable',
  createdAt: dayjs('2023-03-10T17:22'),
};

export const sampleWithFullData: ISupplier = {
  id: 82103,
  companyName: 'bluetooth 1080p USB',
  adresse: 'payment info-mediaries',
  tel: 'deposit Fundamental',
  mobile: 'Generic application',
  emailAdress: 'support firewall',
  createdAt: dayjs('2023-03-10T17:55'),
};

export const sampleWithNewData: NewSupplier = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
