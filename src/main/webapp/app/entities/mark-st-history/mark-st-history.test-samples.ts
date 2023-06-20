import dayjs from 'dayjs/esm';

import { IMarkStHistory, NewMarkStHistory } from './mark-st-history.model';

export const sampleWithRequiredData: IMarkStHistory = {
  id: 7500,
};

export const sampleWithPartialData: IMarkStHistory = {
  id: 72984,
  startTime: dayjs('2023-03-10T18:17'),
  endTime: dayjs('2023-03-10T16:48'),
};

export const sampleWithFullData: IMarkStHistory = {
  id: 86008,
  startTime: dayjs('2023-03-11T00:58'),
  endTime: dayjs('2023-03-10T16:01'),
};

export const sampleWithNewData: NewMarkStHistory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
