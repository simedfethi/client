import dayjs from 'dayjs/esm';

import { CompaignType } from 'app/entities/enumerations/compaign-type.model';
import { Compaignpriority } from 'app/entities/enumerations/compaignpriority.model';
import { CompaignAction } from 'app/entities/enumerations/compaign-action.model';

import { IMarkCompaign, NewMarkCompaign } from './mark-compaign.model';

export const sampleWithRequiredData: IMarkCompaign = {
  id: 57541,
};

export const sampleWithPartialData: IMarkCompaign = {
  id: 93731,
  subject: 'Account enable up',
  linkParam: 'grey',
  currentAction: CompaignAction['SUSPEND'],
  receipientTotal: 32058,
  receipientClick: 3608,
  endAt: dayjs('2023-02-12T20:06'),
};

export const sampleWithFullData: IMarkCompaign = {
  id: 22813,
  subject: 'Integration Principal Shilling',
  compaigntype: CompaignType['INSTAGRAM'],
  attachement: 'Producer',
  linkParam: 'optical',
  priorityM: Compaignpriority['MEDIUM'],
  currentAction: CompaignAction['RESUME'],
  receipientTotal: 41075,
  receipientReceive: 27509,
  receipientView: 96138,
  receipientClick: 88434,
  sendTime: dayjs('2023-02-13T08:56'),
  createdAt: dayjs('2023-02-13T10:15'),
  endAt: dayjs('2023-02-13T10:06'),
};

export const sampleWithNewData: NewMarkCompaign = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
