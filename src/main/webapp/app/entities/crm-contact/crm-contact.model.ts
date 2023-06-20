import dayjs from 'dayjs/esm';
import { ICrmContactType } from 'app/entities/crm-contact-type/crm-contact-type.model';
import { ICrmCOntactSource } from 'app/entities/crm-c-ontact-source/crm-c-ontact-source.model';
import { IEmployee } from 'app/entities/employee/employee.model';
import { ICustomer } from 'app/entities/customer/customer.model';
import { ITransactionCRM } from 'app/entities/transaction-crm/transaction-crm.model';

export interface ICrmContact {
  id: number;
  lastName?: string | null;
  firstName?: string | null;
  emailAddress?: string | null;
  jobTitle?: string | null;
  contactJob?: string | null;
  businessPhone?: string | null;
  homePhone?: string | null;
  mobilePhone?: string | null;
  faxNumber?: string | null;
  addresse?: string | null;
  naissanceDate?: dayjs.Dayjs | null;
  photo?: string | null;
  photoContentType?: string | null;
  wilaya?: string | null;
  daira?: string | null;
  codePostal?: string | null;
  commune?: string | null;
  pays?: string | null;
  webPage?: string | null;
  aboutSource?: string | null;
  notes?: string | null;
  createdTime?: dayjs.Dayjs | null;
  lastUpdate?: dayjs.Dayjs | null;
  contacttype?: Pick<ICrmContactType, 'id' | 'contactType'> | null;
  crmContactSource?: Pick<ICrmCOntactSource, 'id' | 'contactSource'> | null;
  responsable?: Pick<IEmployee, 'id' | 'employeeName'> | null;
  societe?: Pick<ICustomer, 'id' | 'company'> | null;
  transactionCRMS?: Pick<ITransactionCRM, 'id'>[] | null;
  customers?: Pick<ICustomer, 'id'>[] | null;
}

export type NewCrmContact = Omit<ICrmContact, 'id'> & { id: null };
