export interface IProjectStatus {
  id: number;
  stName?: string | null;
}

export type NewProjectStatus = Omit<IProjectStatus, 'id'> & { id: null };
