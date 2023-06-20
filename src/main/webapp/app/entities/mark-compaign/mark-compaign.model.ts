import dayjs from 'dayjs/esm';
import { IEmployee } from 'app/entities/employee/employee.model';
import { IMarkSegment } from 'app/entities/mark-segment/mark-segment.model';
import { CompaignType } from 'app/entities/enumerations/compaign-type.model';
import { Compaignpriority } from 'app/entities/enumerations/compaignpriority.model';
import { CompaignAction } from 'app/entities/enumerations/compaign-action.model';

export interface IMarkCompaign {
  id: number;
  subject?: string | null;
  compaigntype?: CompaignType | null;
  attachement?: string | null;
  linkParam?: string | null;
  priorityM?: Compaignpriority | null;
  currentAction?: CompaignAction | null;
  receipientTotal?: number | null;
  receipientReceive?: number | null;
  receipientView?: number | null;
  receipientClick?: number | null;
  sendTime?: dayjs.Dayjs | null;
  createdAt?: dayjs.Dayjs | null;
  endAt?: dayjs.Dayjs | null;
  templateContent?: string | null;
  htmlContent?: string | null;
  sender?: Pick<IEmployee, 'id' | 'employeeName'> | null;
  markSegments?: Pick<IMarkSegment, 'id'>[] | null;
}

export type NewMarkCompaign = Omit<IMarkCompaign, 'id'> & { id: null };
