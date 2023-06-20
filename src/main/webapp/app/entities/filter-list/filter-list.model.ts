export interface IFilterList {
  id: number;
  filterName?: string | null;
  filterString?: string | null;
  entname?: string | null;
}

export type NewFilterList = Omit<IFilterList, 'id'> & { id: null };
