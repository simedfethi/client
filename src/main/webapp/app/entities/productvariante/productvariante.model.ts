import { IProduct } from 'app/entities/product/product.model';

export interface IProductvariante {
  id: number;
  picture?: string | null;
  pictureContentType?: string | null;
  codebarre?: string | null;
  productCode?: string | null;
  salePrice?: number | null;
  uniteMesure?: string | null;
  stockDisponible?: number | null;
  products?: Pick<IProduct, 'id'>[] | null;
}

export type NewProductvariante = Omit<IProductvariante, 'id'> & { id: null };
