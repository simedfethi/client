import { ICompany, NewCompany } from './company.model';

export const sampleWithRequiredData: ICompany = {
  id: 32440,
};

export const sampleWithPartialData: ICompany = {
  id: 13981,
  lastName: 'Kuhic',
  emailAddress: 'visualize Belize',
  jobTitle: 'Central Directives Designer',
  businessPhone: 'Devolved',
  mobilePhone: 'Australia',
  address: 'Technician',
  countryRegion: 'Nebraska',
};

export const sampleWithFullData: ICompany = {
  id: 47834,
  company: 'panel RAM withdrawal',
  lastName: 'Powlowski',
  firstName: 'Scottie',
  emailAddress: 'payment dynamic TCP',
  jobTitle: 'Human Factors Liaison',
  businessPhone: 'aggregate neural Account',
  homePhone: 'models Plastic target',
  mobilePhone: 'Squares',
  faxNumber: 'optimizing deliver',
  address: '1080p',
  city: 'Simi Valley',
  stateProvince: 'homogeneous Interactions',
  zipPostalCode: 'Tobago Avon',
  countryRegion: 'Home Bolivia',
  webPage: 'red',
  notes: 'Granite',
  attachments: '../fake-data/blob/hipster.png',
  attachmentsContentType: 'unknown',
};

export const sampleWithNewData: NewCompany = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
