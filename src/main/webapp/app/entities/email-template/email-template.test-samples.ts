import dayjs from 'dayjs/esm';

import { TemplateType } from 'app/entities/enumerations/template-type.model';

import { IEmailTemplate, NewEmailTemplate } from './email-template.model';

export const sampleWithRequiredData: IEmailTemplate = {
  id: 70522,
};

export const sampleWithPartialData: IEmailTemplate = {
  id: 15225,
  templateName: 'Tasty integrate',
  templateContent: '../fake-data/blob/hipster.txt',
  htmlContent: '../fake-data/blob/hipster.txt',
  useCount: 12442,
  createdAt: dayjs('2023-03-02T15:21'),
  attachments: '../fake-data/blob/hipster.png',
  attachmentsContentType: 'unknown',
};

export const sampleWithFullData: IEmailTemplate = {
  id: 71189,
  templateName: 'Tasty',
  emailSubject: 'Berkshire architectures methodical',
  templateContent: '../fake-data/blob/hipster.txt',
  tempType: TemplateType['SMS'],
  htmlContent: '../fake-data/blob/hipster.txt',
  useCount: 53397,
  createdAt: dayjs('2023-03-01T22:35'),
  attachments: '../fake-data/blob/hipster.png',
  attachmentsContentType: 'unknown',
};

export const sampleWithNewData: NewEmailTemplate = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
