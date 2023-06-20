export interface ICrmAvancement {
  id: number;
  avanName?: string | null;
}

export type NewCrmAvancement = Omit<ICrmAvancement, 'id'> & { id: null };
