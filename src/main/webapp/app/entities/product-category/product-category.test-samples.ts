import { IProductCategory, NewProductCategory } from './product-category.model';

export const sampleWithRequiredData: IProductCategory = {
  id: 39228,
};

export const sampleWithPartialData: IProductCategory = {
  id: 91645,
  categoryName: 'Guatemala Salad Associate',
  categoryCode: 'protocol Dynamic algorithm',
};

export const sampleWithFullData: IProductCategory = {
  id: 73260,
  categoryName: 'Accounts',
  categoryCode: 'tolerance Borders',
};

export const sampleWithNewData: NewProductCategory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
