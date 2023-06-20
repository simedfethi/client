import dayjs from 'dayjs/esm';
import { TemplateType } from 'app/entities/enumerations/template-type.model';

export interface IEmailTemplate {
  id: number;
  templateName?: string | null;
  emailSubject?: string | null;
  templateContent?: string | null;
  tempType?: TemplateType | null;
  htmlContent?: string | null;
  useCount?: number | null;
  createdAt?: dayjs.Dayjs | null;
  attachments?: string | null;
  attachmentsContentType?: string | null;
}

export type NewEmailTemplate = Omit<IEmailTemplate, 'id'> & { id: null };
