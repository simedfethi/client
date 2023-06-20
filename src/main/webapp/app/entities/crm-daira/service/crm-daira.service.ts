import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICrmDaira, NewCrmDaira } from '../crm-daira.model';

export type PartialUpdateCrmDaira = Partial<ICrmDaira> & Pick<ICrmDaira, 'id'>;

export type EntityResponseType = HttpResponse<ICrmDaira>;
export type EntityArrayResponseType = HttpResponse<ICrmDaira[]>;

@Injectable({ providedIn: 'root' })
export class CrmDairaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crm-dairas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crmDaira: NewCrmDaira): Observable<EntityResponseType> {
    return this.http.post<ICrmDaira>(this.resourceUrl, crmDaira, { observe: 'response' });
  }

  update(crmDaira: ICrmDaira): Observable<EntityResponseType> {
    return this.http.put<ICrmDaira>(`${this.resourceUrl}/${this.getCrmDairaIdentifier(crmDaira)}`, crmDaira, { observe: 'response' });
  }

  partialUpdate(crmDaira: PartialUpdateCrmDaira): Observable<EntityResponseType> {
    return this.http.patch<ICrmDaira>(`${this.resourceUrl}/${this.getCrmDairaIdentifier(crmDaira)}`, crmDaira, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrmDaira>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrmDaira[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCrmDairaIdentifier(crmDaira: Pick<ICrmDaira, 'id'>): number {
    return crmDaira.id;
  }

  compareCrmDaira(o1: Pick<ICrmDaira, 'id'> | null, o2: Pick<ICrmDaira, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrmDairaIdentifier(o1) === this.getCrmDairaIdentifier(o2) : o1 === o2;
  }

  addCrmDairaToCollectionIfMissing<Type extends Pick<ICrmDaira, 'id'>>(
    crmDairaCollection: Type[],
    ...crmDairasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crmDairas: Type[] = crmDairasToCheck.filter(isPresent);
    if (crmDairas.length > 0) {
      const crmDairaCollectionIdentifiers = crmDairaCollection.map(crmDairaItem => this.getCrmDairaIdentifier(crmDairaItem)!);
      const crmDairasToAdd = crmDairas.filter(crmDairaItem => {
        const crmDairaIdentifier = this.getCrmDairaIdentifier(crmDairaItem);
        if (crmDairaCollectionIdentifiers.includes(crmDairaIdentifier)) {
          return false;
        }
        crmDairaCollectionIdentifiers.push(crmDairaIdentifier);
        return true;
      });
      return [...crmDairasToAdd, ...crmDairaCollection];
    }
    return crmDairaCollection;
  }
}
