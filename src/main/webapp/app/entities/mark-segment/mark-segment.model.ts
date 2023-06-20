import dayjs from 'dayjs/esm';
import { IMarkCompaign } from 'app/entities/mark-compaign/mark-compaign.model';

export interface IMarkSegment {
  id: number;
  segmentName?: string | null;
  customerFilter?: string | null;
  contactFilter?: string | null;
  destinataires?: string | null;
  createdAt?: dayjs.Dayjs | null;
  markCompaigns?: Pick<IMarkCompaign, 'id'>[] | null;
}

export type NewMarkSegment = Omit<IMarkSegment, 'id'> & { id: null };
