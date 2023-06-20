import { IUniteMesure, NewUniteMesure } from './unite-mesure.model';

export const sampleWithRequiredData: IUniteMesure = {
  id: 80262,
};

export const sampleWithPartialData: IUniteMesure = {
  id: 80292,
  unitShortName: 'deposit Central',
};

export const sampleWithFullData: IUniteMesure = {
  id: 93931,
  unitName: 'olive',
  unitShortName: 'Savings New',
};

export const sampleWithNewData: NewUniteMesure = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
