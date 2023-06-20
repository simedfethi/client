import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICrmAvancement, NewCrmAvancement } from '../crm-avancement.model';

export type PartialUpdateCrmAvancement = Partial<ICrmAvancement> & Pick<ICrmAvancement, 'id'>;

export type EntityResponseType = HttpResponse<ICrmAvancement>;
export type EntityArrayResponseType = HttpResponse<ICrmAvancement[]>;

@Injectable({ providedIn: 'root' })
export class CrmAvancementService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crm-avancements');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crmAvancement: NewCrmAvancement): Observable<EntityResponseType> {
    return this.http.post<ICrmAvancement>(this.resourceUrl, crmAvancement, { observe: 'response' });
  }

  update(crmAvancement: ICrmAvancement): Observable<EntityResponseType> {
    return this.http.put<ICrmAvancement>(`${this.resourceUrl}/${this.getCrmAvancementIdentifier(crmAvancement)}`, crmAvancement, {
      observe: 'response',
    });
  }

  partialUpdate(crmAvancement: PartialUpdateCrmAvancement): Observable<EntityResponseType> {
    return this.http.patch<ICrmAvancement>(`${this.resourceUrl}/${this.getCrmAvancementIdentifier(crmAvancement)}`, crmAvancement, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrmAvancement>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrmAvancement[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCrmAvancementIdentifier(crmAvancement: Pick<ICrmAvancement, 'id'>): number {
    return crmAvancement.id;
  }

  compareCrmAvancement(o1: Pick<ICrmAvancement, 'id'> | null, o2: Pick<ICrmAvancement, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrmAvancementIdentifier(o1) === this.getCrmAvancementIdentifier(o2) : o1 === o2;
  }

  addCrmAvancementToCollectionIfMissing<Type extends Pick<ICrmAvancement, 'id'>>(
    crmAvancementCollection: Type[],
    ...crmAvancementsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crmAvancements: Type[] = crmAvancementsToCheck.filter(isPresent);
    if (crmAvancements.length > 0) {
      const crmAvancementCollectionIdentifiers = crmAvancementCollection.map(
        crmAvancementItem => this.getCrmAvancementIdentifier(crmAvancementItem)!
      );
      const crmAvancementsToAdd = crmAvancements.filter(crmAvancementItem => {
        const crmAvancementIdentifier = this.getCrmAvancementIdentifier(crmAvancementItem);
        if (crmAvancementCollectionIdentifiers.includes(crmAvancementIdentifier)) {
          return false;
        }
        crmAvancementCollectionIdentifiers.push(crmAvancementIdentifier);
        return true;
      });
      return [...crmAvancementsToAdd, ...crmAvancementCollection];
    }
    return crmAvancementCollection;
  }
}
