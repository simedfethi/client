export interface IAffaireCategory {
  id: number;
  categoryName?: string | null;
}

export type NewAffaireCategory = Omit<IAffaireCategory, 'id'> & { id: null };
