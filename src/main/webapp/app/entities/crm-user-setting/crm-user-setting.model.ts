import { IEmployee } from 'app/entities/employee/employee.model';

export interface ICrmUserSetting {
  id: number;
  stName?: string | null;
  stValue?: string | null;
  employees?: Pick<IEmployee, 'id'>[] | null;
}

export type NewCrmUserSetting = Omit<ICrmUserSetting, 'id'> & { id: null };
