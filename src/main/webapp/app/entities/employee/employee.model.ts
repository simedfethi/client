import { IUser } from 'app/entities/user/user.model';
import { IDepartement } from 'app/entities/departement/departement.model';
import { ICrmUserSetting } from 'app/entities/crm-user-setting/crm-user-setting.model';
import { ICrmPermission } from 'app/entities/crm-permission/crm-permission.model';
import { IActivite } from 'app/entities/activite/activite.model';
import { Gender } from 'app/entities/enumerations/gender.model';

export interface IEmployee {
  id: number;
  employeeName?: string | null;
  gender?: Gender | null;
  phone?: string | null;
  addressLine1?: string | null;
  emailAdress?: string | null;
  utilisateur?: Pick<IUser, 'id' | 'login'> | null;
  departement?: Pick<IDepartement, 'id' | 'departmentName'> | null;
  crmUserSettings?: Pick<ICrmUserSetting, 'id'>[] | null;
  crmPermissions?: Pick<ICrmPermission, 'id'>[] | null;
  activityEmps?: Pick<IActivite, 'id'>[] | null;
}

export type NewEmployee = Omit<IEmployee, 'id'> & { id: null };
