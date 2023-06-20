export interface ITransportUnit {
  id: number;
  tunitName?: string | null;
  tunitmatricule?: string | null;
  tunitmatriculeRem?: string | null;
  tunitmarque?: string | null;
  tunitmodel?: string | null;
  tunitcolor?: string | null;
  tcapacity?: string | null;
}

export type NewTransportUnit = Omit<ITransportUnit, 'id'> & { id: null };
