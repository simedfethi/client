export interface IEmployerNumber {
  id: number;
  emplNumber?: string | null;
}

export type NewEmployerNumber = Omit<IEmployerNumber, 'id'> & { id: null };
