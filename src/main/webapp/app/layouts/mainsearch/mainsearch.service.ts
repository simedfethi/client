import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ApplicationConfigService} from "../../core/config/application-config.service";
import {createRequestOption} from "../../core/request/request-util";


import {Observable} from "rxjs";

import {RestCustomer} from "../../entities/customer/service/customer.service";

import {ISearchResult} from "./mainsearch.model";


export type EntityArrayResponseType = HttpResponse<RestCustomer[]>;



@Injectable({providedIn :'root'})
export class MainsearchService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/mainsearch/search');
  protected locationUrl = this.applicationConfigService.getEndpointFor('api/mainsearch/searchbylocation');

  constructor(protected http:HttpClient,protected applicationConfigService: ApplicationConfigService) {
  }

  query(req?:any):Observable<HttpResponse<ISearchResult>>  {
    const options = createRequestOption(req);
    return this.http
      .get<ISearchResult>(this.resourceUrl, { params: options, observe: 'response' });
  }
  searchbylocation(req?:any):Observable<HttpResponse<ISearchResult>>  {
    const options = createRequestOption(req);
    return this.http
      .get<ISearchResult>(this.locationUrl, { params: options, observe: 'response' });
  }

}
