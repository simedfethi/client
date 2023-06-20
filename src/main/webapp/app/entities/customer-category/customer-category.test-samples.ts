import { ICustomerCategory, NewCustomerCategory } from './customer-category.model';

export const sampleWithRequiredData: ICustomerCategory = {
  id: 18029,
};

export const sampleWithPartialData: ICustomerCategory = {
  id: 65613,
  catName: 'Metal',
};

export const sampleWithFullData: ICustomerCategory = {
  id: 95081,
  catCode: 'Plastic AGP',
  catName: 'Industrial Romania compelling',
};

export const sampleWithNewData: NewCustomerCategory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
