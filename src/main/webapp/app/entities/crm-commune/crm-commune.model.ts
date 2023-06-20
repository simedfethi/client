import { ICrmDaira } from 'app/entities/crm-daira/crm-daira.model';

export interface ICrmCommune {
  id: number;
  communeName?: string | null;
  crmDaira?: Pick<ICrmDaira, 'id'> | null;
}

export type NewCrmCommune = Omit<ICrmCommune, 'id'> & { id: null };
