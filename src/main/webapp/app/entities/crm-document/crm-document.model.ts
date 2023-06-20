import dayjs from 'dayjs/esm';
import { ITransporter } from 'app/entities/transporter/transporter.model';
import { ITransportUnit } from 'app/entities/transport-unit/transport-unit.model';
import { ICrmDocType } from 'app/entities/crm-doc-type/crm-doc-type.model';
import { IEmployee } from 'app/entities/employee/employee.model';
import { ICustomer } from 'app/entities/customer/customer.model';
import { ICrmContact } from 'app/entities/crm-contact/crm-contact.model';
import { ITransactionCRM } from 'app/entities/transaction-crm/transaction-crm.model';
import {ICrmDocumentLine} from "../crm-document-line/crm-document-line.model";

export interface ICrmDocument {
  id: number;
  documentname?: string | null;
  docnumber?: string | null;
  docnotes?: string | null;
  cretedDate?: dayjs.Dayjs | null;
  updateDate?: dayjs.Dayjs | null;
  totalPrice?: number | null;
  reductionPercent?: number | null;
  reductionAmount?: number | null;
  shipping?: number | null;
  taxPrice?: number | null;
  netPrice?: number | null;
  transporteur?: Pick<ITransporter, 'id' | 'nomprenom'> | null;
  transportunit?: Pick<ITransportUnit, 'id' | 'tunitName'> | null;
  crmdoctype?: Pick<ICrmDocType, 'id' | 'cdtname'> | null;
  createdBy?: Pick<IEmployee, 'id' | 'employeeName'> | null;
  customer?: Pick<ICustomer, 'id' | 'company'> | null;
  crmContact?: Pick<ICrmContact, 'id'> | null;
  crmDocumentLines?:  ICrmDocumentLine [] | null;
  transactionCRM?: Pick<ITransactionCRM, 'id'> | null;
}

export type NewCrmDocument = Omit<ICrmDocument, 'id'> & { id: null };
