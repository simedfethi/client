export interface ITransactionEtape {
  id: number;
  teName?: string | null;
  teDescription?: string | null;
  tebgColor?: string | null;
  teIcon?: string | null;
}

export type NewTransactionEtape = Omit<ITransactionEtape, 'id'> & { id: null };
