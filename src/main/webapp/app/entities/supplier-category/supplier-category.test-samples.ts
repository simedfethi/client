import { ISupplierCategory, NewSupplierCategory } from './supplier-category.model';

export const sampleWithRequiredData: ISupplierCategory = {
  id: 79427,
};

export const sampleWithPartialData: ISupplierCategory = {
  id: 5119,
  spCategory: 'alarm Vatu Handmade',
};

export const sampleWithFullData: ISupplierCategory = {
  id: 28409,
  spCategory: 'bluetooth',
};

export const sampleWithNewData: NewSupplierCategory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
