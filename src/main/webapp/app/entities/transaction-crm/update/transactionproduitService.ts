import {ICrmDocument, NewCrmDocument} from '../../crm-document/crm-document.model';
import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ICrmDocType} from '../../crm-doc-type/crm-doc-type.model';
import {CrmDocumentService, EntityResponseType} from '../../crm-document/service/crm-document.service';
import {CrmDocTypeService} from '../../crm-doc-type/service/crm-doc-type.service';
import dayjs from 'dayjs/esm';
import {ITransactionCRM} from '../transaction-crm.model';
import {ICrmDocumentLine, NewCrmDocumentLine} from '../../crm-document-line/crm-document-line.model';
import {CrmDocumentLineService} from '../../crm-document-line/service/crm-document-line.service';
import {lastValueFrom, Observable} from 'rxjs';
import {MessageService} from './messageService';

@Injectable({ providedIn: 'root' })
export class TransactionproduitService {
  crmdoctypeCollection: ICrmDocType[] = [];
  crmDoc: ICrmDocument | NewCrmDocument = { id: null };

  constructor(
    protected crmDocumentService: CrmDocumentService,
    protected crmDocumentTypeService: CrmDocTypeService,
    protected crmDocumentLineService: CrmDocumentLineService,
    protected messageService: MessageService
  ) {}
  HandleTransactionProduit(transactioncrm: ITransactionCRM, crmDocumentsSharedCollection: ICrmDocument[]): void {
    this.crmDocumentTypeService.query().subscribe({
      next: (res: HttpResponse<ICrmDocType[]>) => {
        this.crmdoctypeCollection = res.body ?? [];
       // this.FindandCreateCrmDoc(transactioncrm, crmDocumentsSharedCollection);
      },
    });
  }

  CreateCrmDoc(transactioncrm: ITransactionCRM | null,crmdoctypeCollection:ICrmDocType[] ): Observable<EntityResponseType> {
    const currentTime = dayjs();
    const doctype = crmdoctypeCollection.find(f => f.cdtRef === 'PRO');
    const crmDoc = {
      id: null,
      cretedDate: currentTime,
      updateDate: currentTime,
      reductionPercent: 0,
      totalPrice: 0,
      taxPrice: 0,
      netPrice: 0,
      transactionCRM : transactioncrm,
      crmdoctype : doctype
    } as NewCrmDocument;
    return this.crmDocumentService.create(crmDoc);
  }
  ProduitsFromDocumentlist(crmDocumentsSharedCollection: ICrmDocument[]): ICrmDocument | undefined {
    const doctype = this.crmdoctypeCollection.find(f => f.cdtRef === 'PRO');
    return crmDocumentsSharedCollection.find(c => (c.crmdoctype = doctype));
  }

  SaveCrmlinedoc(crmline: ICrmDocumentLine | NewCrmDocumentLine): void {
    if (crmline.id === null) {
      this.subscribeToSaveResponse(this.crmDocumentLineService.create(crmline));
    } else {
      this.subscribeToSaveResponse(this.crmDocumentLineService.update(crmline));
    }
  }
  subscribeToSaveResponse(result: Observable<HttpResponse<ICrmDocumentLine>>): void {
    result.subscribe((r: HttpResponse<ICrmDocumentLine>) => {
      console.log(r);
    });
  }
}
