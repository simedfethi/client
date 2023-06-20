import { ITransportUnit, NewTransportUnit } from './transport-unit.model';

export const sampleWithRequiredData: ITransportUnit = {
  id: 13794,
};

export const sampleWithPartialData: ITransportUnit = {
  id: 93643,
  tunitName: 'world-class distributed',
  tunitmatricule: 'SCSI Dinar',
  tunitmatriculeRem: 'program',
  tunitmarque: 'Orchestrator override Intelligent',
  tunitmodel: 'programming Buckinghamshire navigating',
  tcapacity: 'Tactics Electronics THX',
};

export const sampleWithFullData: ITransportUnit = {
  id: 19116,
  tunitName: 'Fully-configurable card Rubber',
  tunitmatricule: 'Fresh seize Trail',
  tunitmatriculeRem: 'reinvent reboot',
  tunitmarque: 'Games projection Mission',
  tunitmodel: 'Assurance Clothing',
  tunitcolor: 'Representative Group',
  tcapacity: 'American Generic Netherlands',
};

export const sampleWithNewData: NewTransportUnit = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
