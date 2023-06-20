export interface IUniteMesure {
  id: number;
  unitName?: string | null;
  unitShortName?: string | null;
}

export type NewUniteMesure = Omit<IUniteMesure, 'id'> & { id: null };
