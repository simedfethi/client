import dayjs from 'dayjs/esm';

import { TypeActivite } from 'app/entities/enumerations/type-activite.model';
import { ImportanceCategory } from 'app/entities/enumerations/importance-category.model';

import { IActivite, NewActivite } from './activite.model';

export const sampleWithRequiredData: IActivite = {
  id: 20271,
  typeactivite: TypeActivite['COMMENTAIRE'],
};

export const sampleWithPartialData: IActivite = {
  id: 65327,
  typeactivite: TypeActivite['APPELER'],
  heureActivite: dayjs('2023-02-02T08:05'),
};

export const sampleWithFullData: IActivite = {
  id: 59379,
  typeactivite: TypeActivite['APPELER'],
  resume: 'Soap',
  dateEcheance: dayjs('2023-02-02'),
  heureActivite: dayjs('2023-02-01T19:47'),
  importance: ImportanceCategory['MOYENNE'],
  note: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewActivite = {
  typeactivite: TypeActivite['A_FAIRE'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
