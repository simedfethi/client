import { ICrmCountry, NewCrmCountry } from './crm-country.model';

export const sampleWithRequiredData: ICrmCountry = {
  id: 20522,
};

export const sampleWithPartialData: ICrmCountry = {
  id: 21861,
  countryName: 'Facilitator quantify FTP',
};

export const sampleWithFullData: ICrmCountry = {
  id: 95367,
  countryName: 'Chips Account THX',
};

export const sampleWithNewData: NewCrmCountry = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
