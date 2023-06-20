import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICrmCOntactSource, NewCrmCOntactSource } from '../crm-c-ontact-source.model';

export type PartialUpdateCrmCOntactSource = Partial<ICrmCOntactSource> & Pick<ICrmCOntactSource, 'id'>;

export type EntityResponseType = HttpResponse<ICrmCOntactSource>;
export type EntityArrayResponseType = HttpResponse<ICrmCOntactSource[]>;

@Injectable({ providedIn: 'root' })
export class CrmCOntactSourceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crm-c-ontact-sources');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crmCOntactSource: NewCrmCOntactSource): Observable<EntityResponseType> {
    return this.http.post<ICrmCOntactSource>(this.resourceUrl, crmCOntactSource, { observe: 'response' });
  }

  update(crmCOntactSource: ICrmCOntactSource): Observable<EntityResponseType> {
    return this.http.put<ICrmCOntactSource>(
      `${this.resourceUrl}/${this.getCrmCOntactSourceIdentifier(crmCOntactSource)}`,
      crmCOntactSource,
      { observe: 'response' }
    );
  }

  partialUpdate(crmCOntactSource: PartialUpdateCrmCOntactSource): Observable<EntityResponseType> {
    return this.http.patch<ICrmCOntactSource>(
      `${this.resourceUrl}/${this.getCrmCOntactSourceIdentifier(crmCOntactSource)}`,
      crmCOntactSource,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrmCOntactSource>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrmCOntactSource[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCrmCOntactSourceIdentifier(crmCOntactSource: Pick<ICrmCOntactSource, 'id'>): number {
    return crmCOntactSource.id;
  }

  compareCrmCOntactSource(o1: Pick<ICrmCOntactSource, 'id'> | null, o2: Pick<ICrmCOntactSource, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrmCOntactSourceIdentifier(o1) === this.getCrmCOntactSourceIdentifier(o2) : o1 === o2;
  }

  addCrmCOntactSourceToCollectionIfMissing<Type extends Pick<ICrmCOntactSource, 'id'>>(
    crmCOntactSourceCollection: Type[],
    ...crmCOntactSourcesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crmCOntactSources: Type[] = crmCOntactSourcesToCheck.filter(isPresent);
    if (crmCOntactSources.length > 0) {
      const crmCOntactSourceCollectionIdentifiers = crmCOntactSourceCollection.map(
        crmCOntactSourceItem => this.getCrmCOntactSourceIdentifier(crmCOntactSourceItem)!
      );
      const crmCOntactSourcesToAdd = crmCOntactSources.filter(crmCOntactSourceItem => {
        const crmCOntactSourceIdentifier = this.getCrmCOntactSourceIdentifier(crmCOntactSourceItem);
        if (crmCOntactSourceCollectionIdentifiers.includes(crmCOntactSourceIdentifier)) {
          return false;
        }
        crmCOntactSourceCollectionIdentifiers.push(crmCOntactSourceIdentifier);
        return true;
      });
      return [...crmCOntactSourcesToAdd, ...crmCOntactSourceCollection];
    }
    return crmCOntactSourceCollection;
  }
}
