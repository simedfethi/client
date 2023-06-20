import { IMonnaie, NewMonnaie } from './monnaie.model';

export const sampleWithRequiredData: IMonnaie = {
  id: 14403,
};

export const sampleWithPartialData: IMonnaie = {
  id: 42504,
  moneyName: 'Up-sized bottom-line Internal',
};

export const sampleWithFullData: IMonnaie = {
  id: 21637,
  moneyName: 'calculating back-end',
  moneyIsocode: 'Street e-markets',
};

export const sampleWithNewData: NewMonnaie = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
