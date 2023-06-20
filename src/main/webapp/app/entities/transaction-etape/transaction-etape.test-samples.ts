import { ITransactionEtape, NewTransactionEtape } from './transaction-etape.model';

export const sampleWithRequiredData: ITransactionEtape = {
  id: 58399,
};

export const sampleWithPartialData: ITransactionEtape = {
  id: 64938,
  teName: 'Home AI',
  tebgColor: 'Concrete',
  teIcon: 'Denmark synthesize Technician',
};

export const sampleWithFullData: ITransactionEtape = {
  id: 45437,
  teName: 'mint',
  teDescription: 'strategize scalable',
  tebgColor: 'Lead',
  teIcon: 'Metrics Terrace',
};

export const sampleWithNewData: NewTransactionEtape = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
