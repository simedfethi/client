import {ICustomer} from "../../entities/customer/customer.model";
import {ICrmContact} from "../../entities/crm-contact/crm-contact.model";
import {ITransactionCRM} from "../../entities/transaction-crm/transaction-crm.model";


export interface ISearchResult {
  customerList :ICustomer[],
  crmContactList : ICrmContact[],
  transactionCRMList: ITransactionCRM[]
}

