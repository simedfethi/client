export interface IDeliveryTerm {
  id: number;
  delTerm?: string | null;
}

export type NewDeliveryTerm = Omit<IDeliveryTerm, 'id'> & { id: null };
