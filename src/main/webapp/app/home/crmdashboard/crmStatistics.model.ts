export interface crmStatistics {
  nbNewprospect: number;
  nbVisite: number;
  nbConverti: number;
  crmStatisticsWilayaList : crmStatisticsWilaya [] ;
  crmStatisticsCategorieClients: crmStatisticsCategorieClient [] ;
  crmStatisticsCommercials:  crmStatisticsCommercial [] ;
  crmStatisticsEtapeCrms :  crmStatisticsEtapeCrm [] ;
}


export interface crmStatisticsWilaya {
  // define properties of the crmStatisticsWilaya interface
  wilayaName: string;
  nbVisite: string;
  nbConverti: number;
}

export interface crmStatisticsCategorieClient {
  // define properties of the crmStatisticsCategorieClient interface
  categorieName: string;
  nbVisite: string;
  nbConverti: number;
}

export interface crmStatisticsCommercial {
  // define properties of the crmStatisticsCommercial interface
  commercialName: string;
  nbVisite: string;
  nbConverti: number;
}

export interface crmStatisticsEtapeCrm {
  // define properties of the crmStatisticsEtapeCrm interface
  etapeName: string;
  nbprospect: number;
}
