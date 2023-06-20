import { IProduct } from 'app/entities/product/product.model';
import { IUniteMesure } from 'app/entities/unite-mesure/unite-mesure.model';
import { ISupplier } from 'app/entities/supplier/supplier.model';
import { ITransactionCRM } from 'app/entities/transaction-crm/transaction-crm.model';
import { IDeliveryTerm } from 'app/entities/delivery-term/delivery-term.model';

export interface ISupplierOffer {
  id: number;
  regularPrice?: number | null;
  discountPrice?: number | null;
  notes?: string | null;
  product?: Pick<IProduct, 'id'> | null;
  uniteMesure?: Pick<IUniteMesure, 'id'> | null;
  supplier?: Pick<ISupplier, 'id'> | null;
  transactionCRM?: Pick<ITransactionCRM, 'id'> | null;
  deliveryTerm?: Pick<IDeliveryTerm, 'id'> | null;
}

export type NewSupplierOffer = Omit<ISupplierOffer, 'id'> & { id: null };
