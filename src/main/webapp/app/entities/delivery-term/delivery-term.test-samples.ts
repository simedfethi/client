import { IDeliveryTerm, NewDeliveryTerm } from './delivery-term.model';

export const sampleWithRequiredData: IDeliveryTerm = {
  id: 53549,
};

export const sampleWithPartialData: IDeliveryTerm = {
  id: 81366,
};

export const sampleWithFullData: IDeliveryTerm = {
  id: 769,
  delTerm: 'Buckinghamshire Liaison Borders',
};

export const sampleWithNewData: NewDeliveryTerm = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
