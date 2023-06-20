export interface ICrmDocType {
  id: number;
  cdtname?: string | null;
  cdtRef?: string | null;
}

export type NewCrmDocType = Omit<ICrmDocType, 'id'> & { id: null };
