import dayjs from 'dayjs/esm';
import { ISupplierCategory } from 'app/entities/supplier-category/supplier-category.model';

export interface ISupplier {
  id: number;
  companyName?: string | null;
  adresse?: string | null;
  tel?: string | null;
  mobile?: string | null;
  emailAdress?: string | null;
  createdAt?: dayjs.Dayjs | null;
  categorie?: Pick<ISupplierCategory, 'id' | 'spCategory'> | null;
}

export type NewSupplier = Omit<ISupplier, 'id'> & { id: null };
