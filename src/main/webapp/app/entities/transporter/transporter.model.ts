import dayjs from 'dayjs/esm';

export interface ITransporter {
  id: number;
  nomprenom?: string | null;
  telephone?: string | null;
  permitdoc?: string | null;
  expireDate?: dayjs.Dayjs | null;
  adresse?: string | null;
  commune?: string | null;
  daira?: string | null;
  wilaya?: string | null;
}

export type NewTransporter = Omit<ITransporter, 'id'> & { id: null };
