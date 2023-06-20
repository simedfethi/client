import { ICrmWilaya } from 'app/entities/crm-wilaya/crm-wilaya.model';

export interface ICrmDaira {
  id: number;
  dairaName?: string | null;
  crmWilaya?: Pick<ICrmWilaya, 'id'> | null;
}

export type NewCrmDaira = Omit<ICrmDaira, 'id'> & { id: null };
