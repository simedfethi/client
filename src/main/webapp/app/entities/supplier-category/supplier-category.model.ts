export interface ISupplierCategory {
  id: number;
  spCategory?: string | null;
}

export type NewSupplierCategory = Omit<ISupplierCategory, 'id'> & { id: null };
