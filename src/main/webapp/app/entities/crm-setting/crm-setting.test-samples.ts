import { ICrmSetting, NewCrmSetting } from './crm-setting.model';

export const sampleWithRequiredData: ICrmSetting = {
  id: 64303,
};

export const sampleWithPartialData: ICrmSetting = {
  id: 46733,
  stName: 'Fall Jewelery Shilling',
};

export const sampleWithFullData: ICrmSetting = {
  id: 24447,
  stName: 'Republic)',
  stValue: 'functionalities',
};

export const sampleWithNewData: NewCrmSetting = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
