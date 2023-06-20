import { IProductvariante, NewProductvariante } from './productvariante.model';

export const sampleWithRequiredData: IProductvariante = {
  id: 32132,
};

export const sampleWithPartialData: IProductvariante = {
  id: 71577,
  codebarre: 'Ville',
  salePrice: 2894,
  stockDisponible: 91529,
};

export const sampleWithFullData: IProductvariante = {
  id: 94248,
  picture: '../fake-data/blob/hipster.png',
  pictureContentType: 'unknown',
  codebarre: 'bypass',
  productCode: 'hack Expanded Intelligent',
  salePrice: 61774,
  uniteMesure: 'Applications',
  stockDisponible: 60732,
};

export const sampleWithNewData: NewProductvariante = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
