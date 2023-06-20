export interface ICrmCOntactSource {
  id: number;
  contactSource?: string | null;
}

export type NewCrmCOntactSource = Omit<ICrmCOntactSource, 'id'> & { id: null };
