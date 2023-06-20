import dayjs from 'dayjs/esm';
import { IEmployee } from 'app/entities/employee/employee.model';
import { ITransactionCRM } from 'app/entities/transaction-crm/transaction-crm.model';
import { ITransactionEtape } from 'app/entities/transaction-etape/transaction-etape.model';

export interface IMarkStHistory {
  id: number;
  startTime?: dayjs.Dayjs | null;
  endTime?: dayjs.Dayjs | null;
  createdby?: Pick<IEmployee, 'id' | 'employeeName'> | null;
  transactionCRM?: Pick<ITransactionCRM, 'id'> | null;
  trEtape?: Pick<ITransactionEtape, 'id' | 'teName'> | null;
}

export type NewMarkStHistory = Omit<IMarkStHistory, 'id'> & { id: null };
