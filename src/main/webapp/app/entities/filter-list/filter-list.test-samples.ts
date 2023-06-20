import { IFilterList, NewFilterList } from './filter-list.model';

export const sampleWithRequiredData: IFilterList = {
  id: 35760,
};

export const sampleWithPartialData: IFilterList = {
  id: 414,
  entname: 'Analyst',
};

export const sampleWithFullData: IFilterList = {
  id: 1363,
  filterName: 'Borders Rustic Metrics',
  filterString: 'Solutions',
  entname: 'Morocco Profit-focused Sleek',
};

export const sampleWithNewData: NewFilterList = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
