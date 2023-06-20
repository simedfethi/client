export interface IMonnaie {
  id: number;
  moneyName?: string | null;
  moneyIsocode?: string | null;
}

export type NewMonnaie = Omit<IMonnaie, 'id'> & { id: null };
