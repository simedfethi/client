import dayjs from 'dayjs/esm';
import { CustomerType } from 'app/entities/enumerations/customer-type.model';

export interface ICrmConcurrent {
  id: number;
  customerType?: CustomerType | null;
  company?: string | null;
  emailAddress?: string | null;
  businessPhone?: string | null;
  mobilePhone?: string | null;
  faxNumber?: string | null;
  caAnnual?: number | null;
  addresse?: string | null;
  wilaya?: string | null;
  daira?: string | null;
  codePostal?: string | null;
  commune?: string | null;
  webPage?: string | null;
  notes?: string | null;
  attachments?: string | null;
  attachmentsContentType?: string | null;
  aboutSource?: string | null;
  createdTime?: dayjs.Dayjs | null;
  lastUpdate?: dayjs.Dayjs | null;
  latitude?: number | null;
  longitude?: number | null;
  logo?: string | null;
  logoContentType?: string | null;
}

export type NewCrmConcurrent = Omit<ICrmConcurrent, 'id'> & { id: null };
