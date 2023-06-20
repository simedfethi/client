import dayjs from 'dayjs/esm';

import { IMarkSegment, NewMarkSegment } from './mark-segment.model';

export const sampleWithRequiredData: IMarkSegment = {
  id: 90352,
};

export const sampleWithPartialData: IMarkSegment = {
  id: 42868,
  customerFilter: 'hack XML',
  destinataires: 'back-end leverage Product',
  createdAt: dayjs('2023-02-12T19:44'),
};

export const sampleWithFullData: IMarkSegment = {
  id: 5563,
  segmentName: 'Wooden',
  customerFilter: 'yellow invoice Chad',
  contactFilter: 'Soft',
  destinataires: 'hard',
  createdAt: dayjs('2023-02-12T19:52'),
};

export const sampleWithNewData: NewMarkSegment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
