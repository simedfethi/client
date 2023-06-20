export interface ICrmCountry {
  id: number;
  countryName?: string | null;
}

export type NewCrmCountry = Omit<ICrmCountry, 'id'> & { id: null };
