import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICrmWilaya, NewCrmWilaya } from '../crm-wilaya.model';

export type PartialUpdateCrmWilaya = Partial<ICrmWilaya> & Pick<ICrmWilaya, 'id'>;

export type EntityResponseType = HttpResponse<ICrmWilaya>;
export type EntityArrayResponseType = HttpResponse<ICrmWilaya[]>;

@Injectable({ providedIn: 'root' })
export class CrmWilayaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crm-wilayas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crmWilaya: NewCrmWilaya): Observable<EntityResponseType> {
    return this.http.post<ICrmWilaya>(this.resourceUrl, crmWilaya, { observe: 'response' });
  }

  update(crmWilaya: ICrmWilaya): Observable<EntityResponseType> {
    return this.http.put<ICrmWilaya>(`${this.resourceUrl}/${this.getCrmWilayaIdentifier(crmWilaya)}`, crmWilaya, { observe: 'response' });
  }

  partialUpdate(crmWilaya: PartialUpdateCrmWilaya): Observable<EntityResponseType> {
    return this.http.patch<ICrmWilaya>(`${this.resourceUrl}/${this.getCrmWilayaIdentifier(crmWilaya)}`, crmWilaya, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrmWilaya>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrmWilaya[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCrmWilayaIdentifier(crmWilaya: Pick<ICrmWilaya, 'id'>): number {
    return crmWilaya.id;
  }

  compareCrmWilaya(o1: Pick<ICrmWilaya, 'id'> | null, o2: Pick<ICrmWilaya, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrmWilayaIdentifier(o1) === this.getCrmWilayaIdentifier(o2) : o1 === o2;
  }

  addCrmWilayaToCollectionIfMissing<Type extends Pick<ICrmWilaya, 'id'>>(
    crmWilayaCollection: Type[],
    ...crmWilayasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crmWilayas: Type[] = crmWilayasToCheck.filter(isPresent);
    if (crmWilayas.length > 0) {
      const crmWilayaCollectionIdentifiers = crmWilayaCollection.map(crmWilayaItem => this.getCrmWilayaIdentifier(crmWilayaItem)!);
      const crmWilayasToAdd = crmWilayas.filter(crmWilayaItem => {
        const crmWilayaIdentifier = this.getCrmWilayaIdentifier(crmWilayaItem);
        if (crmWilayaCollectionIdentifiers.includes(crmWilayaIdentifier)) {
          return false;
        }
        crmWilayaCollectionIdentifiers.push(crmWilayaIdentifier);
        return true;
      });
      return [...crmWilayasToAdd, ...crmWilayaCollection];
    }
    return crmWilayaCollection;
  }
}
