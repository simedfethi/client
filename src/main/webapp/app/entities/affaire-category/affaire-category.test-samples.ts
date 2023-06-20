import { IAffaireCategory, NewAffaireCategory } from './affaire-category.model';

export const sampleWithRequiredData: IAffaireCategory = {
  id: 67672,
};

export const sampleWithPartialData: IAffaireCategory = {
  id: 73122,
  categoryName: 'sensor auxiliary',
};

export const sampleWithFullData: IAffaireCategory = {
  id: 92525,
  categoryName: 'override loyalty enterprise',
};

export const sampleWithNewData: NewAffaireCategory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
