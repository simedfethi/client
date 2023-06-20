import dayjs from 'dayjs/esm';
import { IEmployee } from 'app/entities/employee/employee.model';
import { ICrmCOntactSource } from 'app/entities/crm-c-ontact-source/crm-c-ontact-source.model';
import { IEmployerNumber } from 'app/entities/employer-number/employer-number.model';
import { ICustomerCategory } from 'app/entities/customer-category/customer-category.model';
import { IMonnaie } from 'app/entities/monnaie/monnaie.model';
import { ICrmContact } from 'app/entities/crm-contact/crm-contact.model';
import { CustomerType } from 'app/entities/enumerations/customer-type.model';

export interface ICustomer {
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
  dejaClient?: boolean | null;
  createdTime?: dayjs.Dayjs | null;
  lastUpdate?: dayjs.Dayjs | null;
  latitude?: number | null;
  longitude?: number | null;
  logo?: string | null;
  logoContentType?: string | null;
  commercial?: Pick<IEmployee, 'id' | 'employeeName'> | null;
  customerSource?: Pick<ICrmCOntactSource, 'id' | 'contactSource'> | null;
  nombreEmployee?: Pick<IEmployerNumber, 'id' | 'emplNumber'> | null;
  categorie?: Pick<ICustomerCategory, 'id' | 'catName'> | null;
  caMonnaie?: Pick<IMonnaie, 'id' | 'moneyName'> | null;
  crmContacts?: Pick<ICrmContact, 'id' | 'firstName' | 'lastName'>[] | null;
}

export type NewCustomer = Omit<ICustomer, 'id'> & { id: null };
