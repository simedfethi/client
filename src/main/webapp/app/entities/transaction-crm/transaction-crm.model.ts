import dayjs from 'dayjs/esm';
import { IMonnaie } from 'app/entities/monnaie/monnaie.model';
import { ITransactionEtape } from 'app/entities/transaction-etape/transaction-etape.model';
import { IEmployee } from 'app/entities/employee/employee.model';
import { ICustomer } from 'app/entities/customer/customer.model';
import { ICrmContact } from 'app/entities/crm-contact/crm-contact.model';
import { ICrmDocument } from 'app/entities/crm-document/crm-document.model';
import { TransactionSource } from 'app/entities/enumerations/transaction-source.model';
import {IProjectStatus} from "../project-status/project-status.model";
import {ICrmAvancement} from "../crm-avancement/crm-avancement.model";

export interface ITransactionCRM {
  id: number;
  reference?: string | null;
  montant?: number | null;
  qteAnnuelle?: number | null;
  dateFin?: dayjs.Dayjs | null;
  transactionRecurrente?: boolean | null;
  intituleAffaire?: string | null;
  creeLe?: dayjs.Dayjs | null;
  dernierUpdate?: dayjs.Dayjs | null;
  telephone?: string | null;
  source?: TransactionSource | null;
  adresse?: string | null;
  notes?: string | null;
  locationUrl?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  trValidated?: boolean | null;
  monnaie?: Pick<IMonnaie, 'id' | 'moneyName'> | null;
  trEtape?: Pick<ITransactionEtape, 'id' | 'teName'> | null;
  trStatus?: Pick<IProjectStatus, 'id' | 'stName'> | null;
  attachments?: string | null;
  attachmentsContentType?: string | null;
  wilaya?: string | null;
  daira?: string | null;
  commune?: string | null;
  lastActivity?: dayjs.Dayjs | null;
  delai?: number | null;
  etapeDepuis?: dayjs.Dayjs | null;
  avancement?: Pick<ICrmAvancement, 'id' | 'avanName'> | null;
  chargeAffaire?: Pick<IEmployee, 'id' | 'employeeName'> | null;
  client?:  ICustomer | null;
  crmContacts?: Pick<ICrmContact, 'id' |'firstName' |'lastName'>[] | null;
  crmDocuments?:  ICrmDocument [] | null;
}

export type NewTransactionCRM = Omit<ITransactionCRM, 'id'> & { id: null };
