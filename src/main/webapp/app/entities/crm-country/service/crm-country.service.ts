import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICrmCountry, NewCrmCountry } from '../crm-country.model';

export type PartialUpdateCrmCountry = Partial<ICrmCountry> & Pick<ICrmCountry, 'id'>;

export type EntityResponseType = HttpResponse<ICrmCountry>;
export type EntityArrayResponseType = HttpResponse<ICrmCountry[]>;

@Injectable({ providedIn: 'root' })
export class CrmCountryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crm-countries');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crmCountry: NewCrmCountry): Observable<EntityResponseType> {
    return this.http.post<ICrmCountry>(this.resourceUrl, crmCountry, { observe: 'response' });
  }

  update(crmCountry: ICrmCountry): Observable<EntityResponseType> {
    return this.http.put<ICrmCountry>(`${this.resourceUrl}/${this.getCrmCountryIdentifier(crmCountry)}`, crmCountry, {
      observe: 'response',
    });
  }

  partialUpdate(crmCountry: PartialUpdateCrmCountry): Observable<EntityResponseType> {
    return this.http.patch<ICrmCountry>(`${this.resourceUrl}/${this.getCrmCountryIdentifier(crmCountry)}`, crmCountry, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrmCountry>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrmCountry[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCrmCountryIdentifier(crmCountry: Pick<ICrmCountry, 'id'>): number {
    return crmCountry.id;
  }

  compareCrmCountry(o1: Pick<ICrmCountry, 'id'> | null, o2: Pick<ICrmCountry, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrmCountryIdentifier(o1) === this.getCrmCountryIdentifier(o2) : o1 === o2;
  }

  addCrmCountryToCollectionIfMissing<Type extends Pick<ICrmCountry, 'id'>>(
    crmCountryCollection: Type[],
    ...crmCountriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crmCountries: Type[] = crmCountriesToCheck.filter(isPresent);
    if (crmCountries.length > 0) {
      const crmCountryCollectionIdentifiers = crmCountryCollection.map(crmCountryItem => this.getCrmCountryIdentifier(crmCountryItem)!);
      const crmCountriesToAdd = crmCountries.filter(crmCountryItem => {
        const crmCountryIdentifier = this.getCrmCountryIdentifier(crmCountryItem);
        if (crmCountryCollectionIdentifiers.includes(crmCountryIdentifier)) {
          return false;
        }
        crmCountryCollectionIdentifiers.push(crmCountryIdentifier);
        return true;
      });
      return [...crmCountriesToAdd, ...crmCountryCollection];
    }
    return crmCountryCollection;
  }
}
