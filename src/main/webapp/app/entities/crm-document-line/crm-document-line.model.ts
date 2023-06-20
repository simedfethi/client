import { IUniteMesure } from 'app/entities/unite-mesure/unite-mesure.model';
import { ICrmConcurrent } from 'app/entities/crm-concurrent/crm-concurrent.model';
import { IProduct } from 'app/entities/product/product.model';
import { ICrmDocument } from 'app/entities/crm-document/crm-document.model';

export interface ICrmDocumentLine {
  id: number;
  lignePos?: number | null;
  itemRef?: string | null;
  itemDescription?: string | null;
  qte?: number | null;
  qteExpedited?: number | null;
  unitPrice?: number | null;
  reductionPercent?: number | null;
  unitPriceNet?: number | null;
  reductionAmount?: number | null;
  taxPercent?: number | null;
  totalht?: number | null;
  totalttc?: number | null;
  unite?: Pick<IUniteMesure, 'id' | 'unitShortName'> | null;
  sourceAprov?: Pick<ICrmConcurrent, 'id'> | null;
  produit?: Pick<IProduct, 'id' | 'designation'> | null;
  crmDocument?: Pick<ICrmDocument, 'id'> | null;
}

export type NewCrmDocumentLine = Omit<ICrmDocumentLine, 'id'> & { id: null };
