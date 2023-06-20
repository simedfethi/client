import dayjs from 'dayjs/esm';

import { ICrmContact, NewCrmContact } from './crm-contact.model';

export const sampleWithRequiredData: ICrmContact = {
  id: 36512,
};

export const sampleWithPartialData: ICrmContact = {
  id: 80009,
  firstName: 'Khalil',
  jobTitle: 'Senior Interactions Consultant',
  homePhone: 'Islands',
  faxNumber: 'deploy Avon Home',
  addresse: 'Loan Configuration',
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
  wilaya: 'transition Roads',
  commune: 'Venezuela haptic EXE',
  pays: 'Borders Stravenue Place',
  aboutSource: 'workforce Director full-range',
  createdTime: dayjs('2023-03-17T23:59'),
};

export const sampleWithFullData: ICrmContact = {
  id: 8653,
  lastName: 'Krajcik',
  firstName: 'Leola',
  emailAddress: 'Supervisor',
  jobTitle: 'Senior Interactions Architect',
  contactJob: 'Small Sports',
  businessPhone: 'Generic Chicken Checking',
  homePhone: 'SAS',
  mobilePhone: 'payment program',
  faxNumber: 'Franc Principal',
  addresse: 'green',
  naissanceDate: dayjs('2023-03-18'),
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
  wilaya: 'Intuitive purple',
  daira: 'deliverables',
  codePostal: 'alliance',
  commune: 'Intelligent Syrian user-facing',
  pays: 'Sports',
  webPage: 'Regional Tuna Unions',
  aboutSource: 'Utah overriding Markets',
  notes: 'Checking gold cross-platform',
  createdTime: dayjs('2023-03-18T04:02'),
  lastUpdate: dayjs('2023-03-18T05:45'),
};

export const sampleWithNewData: NewCrmContact = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
