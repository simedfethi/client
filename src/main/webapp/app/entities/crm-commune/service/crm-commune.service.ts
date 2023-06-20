import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICrmCommune, NewCrmCommune } from '../crm-commune.model';

export type PartialUpdateCrmCommune = Partial<ICrmCommune> & Pick<ICrmCommune, 'id'>;

export type EntityResponseType = HttpResponse<ICrmCommune>;
export type EntityArrayResponseType = HttpResponse<ICrmCommune[]>;

@Injectable({ providedIn: 'root' })
export class CrmCommuneService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crm-communes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crmCommune: NewCrmCommune): Observable<EntityResponseType> {
    return this.http.post<ICrmCommune>(this.resourceUrl, crmCommune, { observe: 'response' });
  }

  update(crmCommune: ICrmCommune): Observable<EntityResponseType> {
    return this.http.put<ICrmCommune>(`${this.resourceUrl}/${this.getCrmCommuneIdentifier(crmCommune)}`, crmCommune, {
      observe: 'response',
    });
  }

  partialUpdate(crmCommune: PartialUpdateCrmCommune): Observable<EntityResponseType> {
    return this.http.patch<ICrmCommune>(`${this.resourceUrl}/${this.getCrmCommuneIdentifier(crmCommune)}`, crmCommune, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrmCommune>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrmCommune[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCrmCommuneIdentifier(crmCommune: Pick<ICrmCommune, 'id'>): number {
    return crmCommune.id;
  }

  compareCrmCommune(o1: Pick<ICrmCommune, 'id'> | null, o2: Pick<ICrmCommune, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrmCommuneIdentifier(o1) === this.getCrmCommuneIdentifier(o2) : o1 === o2;
  }

  addCrmCommuneToCollectionIfMissing<Type extends Pick<ICrmCommune, 'id'>>(
    crmCommuneCollection: Type[],
    ...crmCommunesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crmCommunes: Type[] = crmCommunesToCheck.filter(isPresent);
    if (crmCommunes.length > 0) {
      const crmCommuneCollectionIdentifiers = crmCommuneCollection.map(crmCommuneItem => this.getCrmCommuneIdentifier(crmCommuneItem)!);
      const crmCommunesToAdd = crmCommunes.filter(crmCommuneItem => {
        const crmCommuneIdentifier = this.getCrmCommuneIdentifier(crmCommuneItem);
        if (crmCommuneCollectionIdentifiers.includes(crmCommuneIdentifier)) {
          return false;
        }
        crmCommuneCollectionIdentifiers.push(crmCommuneIdentifier);
        return true;
      });
      return [...crmCommunesToAdd, ...crmCommuneCollection];
    }
    return crmCommuneCollection;
  }
}
