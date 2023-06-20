import dayjs from 'dayjs/esm';
import { ICustomer } from 'app/entities/customer/customer.model';
import { ICrmContact } from 'app/entities/crm-contact/crm-contact.model';
import { ITransactionCRM } from 'app/entities/transaction-crm/transaction-crm.model';
import { IEmployee } from 'app/entities/employee/employee.model';
import { TypeActivite } from 'app/entities/enumerations/type-activite.model';
import { ImportanceCategory } from 'app/entities/enumerations/importance-category.model';

export interface IActivite {
  id: number;
  typeactivite?: TypeActivite | null;
  resume?: string | null;
  dateEcheance?: dayjs.Dayjs | null;
  heureActivite?: dayjs.Dayjs | null;
  importance?: ImportanceCategory | null;
  note?: string | null;
  activiteVu?: boolean | null;
  activiteAcheve?: boolean | null;
  endTime?: dayjs.Dayjs | null;
  activiteVuTime?: dayjs.Dayjs | null;
  client?: Pick<ICustomer, 'id' | 'company'> | null;
  crmContact?:  ICrmContact | null;
  transactionCRM?: Pick<ITransactionCRM, 'id'> | null;
  employee?:  IEmployee | null;
  employeeIncluses?: Pick<IEmployee, 'id' | 'employeeName'>[] | null;
}

export type NewActivite = Omit<IActivite, 'id'> & { id: null };
