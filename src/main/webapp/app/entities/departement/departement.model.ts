import { ICompany } from 'app/entities/company/company.model';

export interface IDepartement {
  id: number;
  departmentName?: string | null;
  departmentCode?: string | null;
  entreprise?: Pick<ICompany, 'id' | 'company'> | null;
}

export type NewDepartement = Omit<IDepartement, 'id'> & { id: null };

export interface IDepartementView extends IDepartement{
  selected: boolean;
}
