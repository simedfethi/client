export interface ICrmSetting {
  id: number;
  stName?: string | null;
  stValue?: string | null;
}

export type NewCrmSetting = Omit<ICrmSetting, 'id'> & { id: null };
