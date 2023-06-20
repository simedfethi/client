import { ISupplierOffer, NewSupplierOffer } from './supplier-offer.model';

export const sampleWithRequiredData: ISupplierOffer = {
  id: 48704,
};

export const sampleWithPartialData: ISupplierOffer = {
  id: 78245,
  notes: 'Response indexing',
};

export const sampleWithFullData: ISupplierOffer = {
  id: 94149,
  regularPrice: 19961,
  discountPrice: 35024,
  notes: 'Automated',
};

export const sampleWithNewData: NewSupplierOffer = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
