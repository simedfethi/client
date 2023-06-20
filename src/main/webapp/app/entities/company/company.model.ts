export interface ICompany {
  id: number;
  company?: string | null;
  lastName?: string | null;
  firstName?: string | null;
  emailAddress?: string | null;
  jobTitle?: string | null;
  businessPhone?: string | null;
  homePhone?: string | null;
  mobilePhone?: string | null;
  faxNumber?: string | null;
  address?: string | null;
  city?: string | null;
  stateProvince?: string | null;
  zipPostalCode?: string | null;
  countryRegion?: string | null;
  webPage?: string | null;
  notes?: string | null;
  attachments?: string | null;
  attachmentsContentType?: string | null;
}

export type NewCompany = Omit<ICompany, 'id'> & { id: null };
