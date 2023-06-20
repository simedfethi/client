import { ICrmPermission } from 'app/entities/crm-permission/crm-permission.model';

export interface ICrmRole {
  id: number;
  roleName?: string | null;
  roleCode?: number | null;
  roleDescription?: string | null;
  crmPermissions?: Pick<ICrmPermission, 'id'>[] | null;
}

export type NewCrmRole = Omit<ICrmRole, 'id'> & { id: null };
