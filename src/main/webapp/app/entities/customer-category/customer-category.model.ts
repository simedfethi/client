export interface ICustomerCategory {
  id: number;
  catCode?: string | null;
  catName?: string | null;
}

export type NewCustomerCategory = Omit<ICustomerCategory, 'id'> & { id: null };
