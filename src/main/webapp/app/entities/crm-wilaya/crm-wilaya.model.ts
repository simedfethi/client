import { ICrmCountry } from 'app/entities/crm-country/crm-country.model';

export interface ICrmWilaya {
  id: number;
  wilayaName?: string | null;
  crmCountry?: Pick<ICrmCountry, 'id'> | null;
}

export type NewCrmWilaya = Omit<ICrmWilaya, 'id'> & { id: null };
