import dayjs from 'dayjs/esm';

import { ITransporter, NewTransporter } from './transporter.model';

export const sampleWithRequiredData: ITransporter = {
  id: 89762,
};

export const sampleWithPartialData: ITransporter = {
  id: 44070,
  nomprenom: 'Awesome',
  telephone: '666-312-6227 x0640',
  permitdoc: 'SMTP invoice',
};

export const sampleWithFullData: ITransporter = {
  id: 71147,
  nomprenom: 'Realigned web-readiness Freeway',
  telephone: '1-687-465-1481 x22367',
  permitdoc: 'Dollar',
  expireDate: dayjs('2023-03-10'),
  adresse: 'bypass black Handcrafted',
  commune: 'Soap array hack',
  daira: 'Curve quantifying',
  wilaya: 'Arizona coherent Kids',
};

export const sampleWithNewData: NewTransporter = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
