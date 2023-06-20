export interface ICrmContactType {
  id: number;
  contactType?: string | null;
}

export type NewCrmContactType = Omit<ICrmContactType, 'id'> & { id: null };
