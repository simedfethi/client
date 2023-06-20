export interface IProductCategory {
  id: number;
  categoryName?: string | null;
  categoryCode?: string | null;
}

export type NewProductCategory = Omit<IProductCategory, 'id'> & { id: null };
