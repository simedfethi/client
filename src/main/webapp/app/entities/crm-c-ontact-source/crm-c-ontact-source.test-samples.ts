import { ICrmCOntactSource, NewCrmCOntactSource } from './crm-c-ontact-source.model';

export const sampleWithRequiredData: ICrmCOntactSource = {
  id: 84087,
};

export const sampleWithPartialData: ICrmCOntactSource = {
  id: 28378,
  contactSource: 'Monitored Ergonomic',
};

export const sampleWithFullData: ICrmCOntactSource = {
  id: 22247,
  contactSource: 'Balanced',
};

export const sampleWithNewData: NewCrmCOntactSource = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
