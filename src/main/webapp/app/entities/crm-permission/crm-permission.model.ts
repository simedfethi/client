import { ICrmRole } from 'app/entities/crm-role/crm-role.model';
import { IEmployee } from 'app/entities/employee/employee.model';

export interface ICrmPermission {
  id: number;
  pName?: string | null;
  pDescription?: string | null;
  crmRoles?: Pick<ICrmRole, 'id'>[] | null;
  employees?: Pick<IEmployee, 'id'>[] | null;
}

export type NewCrmPermission = Omit<ICrmPermission, 'id'> & { id: null };
