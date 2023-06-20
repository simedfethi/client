import { IProductCategory } from 'app/entities/product-category/product-category.model';
import { IProductvariante } from 'app/entities/productvariante/productvariante.model';

export interface IProduct {
  id: number;
  productCode?: string | null;
  designation?: string | null;
  description?: string | null;
  categorie?: Pick<IProductCategory, 'id' | 'categoryName'> | null;
  productvariantes?: Pick<IProductvariante, 'id'>[] | null;
}

export type NewProduct = Omit<IProduct, 'id'> & { id: null };
