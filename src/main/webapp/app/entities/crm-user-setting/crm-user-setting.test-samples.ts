import { ICrmUserSetting, NewCrmUserSetting } from './crm-user-setting.model';

export const sampleWithRequiredData: ICrmUserSetting = {
  id: 5792,
};

export const sampleWithPartialData: ICrmUserSetting = {
  id: 43733,
  stValue: 'Tools',
};

export const sampleWithFullData: ICrmUserSetting = {
  id: 6790,
  stName: 'Security XSS',
  stValue: 'Function-based Freeway',
};

export const sampleWithNewData: NewCrmUserSetting = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
