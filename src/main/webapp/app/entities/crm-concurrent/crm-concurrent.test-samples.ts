import dayjs from 'dayjs/esm';

import { CustomerType } from 'app/entities/enumerations/customer-type.model';

import { ICrmConcurrent, NewCrmConcurrent } from './crm-concurrent.model';

export const sampleWithRequiredData: ICrmConcurrent = {
  id: 89743,
};

export const sampleWithPartialData: ICrmConcurrent = {
  id: 30139,
  company: 'Chief paradigm',
  emailAddress: 'Intranet',
  businessPhone: 'JBOD Tuna Handcrafted',
  faxNumber: '1080p',
  wilaya: 'Assistant Licensed',
  webPage: 'Engineer',
  notes: 'Phased Tuna',
  attachments: '../fake-data/blob/hipster.png',
  attachmentsContentType: 'unknown',
  aboutSource: 'convergence Market algorithm',
};

export const sampleWithFullData: ICrmConcurrent = {
  id: 5902,
  customerType: CustomerType['MORALE'],
  company: 'Cheese Steel',
  emailAddress: 'Dollar Product',
  businessPhone: 'Senior Balanced Regional',
  mobilePhone: 'RAM',
  faxNumber: 'Borders hack Sharable',
  caAnnual: 88291,
  addresse: 'Director Sports Croatia',
  wilaya: 'Licensed application',
  daira: 'Sharable Indiana',
  codePostal: 'Wells Forward M',
  commune: 'Handmade Summit',
  webPage: 'Dominica',
  notes: 'Hat Turnpike Shoes',
  attachments: '../fake-data/blob/hipster.png',
  attachmentsContentType: 'unknown',
  aboutSource: 'Burundi intermediate',
  createdTime: dayjs('2023-04-17T05:06'),
  lastUpdate: dayjs('2023-04-17T07:23'),
  latitude: 44791,
  longitude: 24208,
  logo: '../fake-data/blob/hipster.png',
  logoContentType: 'unknown',
};

export const sampleWithNewData: NewCrmConcurrent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
