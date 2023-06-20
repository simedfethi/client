import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICrmContactType, NewCrmContactType } from '../crm-contact-type.model';

export type PartialUpdateCrmContactType = Partial<ICrmContactType> & Pick<ICrmContactType, 'id'>;

export type EntityResponseType = HttpResponse<ICrmContactType>;
export type EntityArrayResponseType = HttpResponse<ICrmContactType[]>;

@Injectable({ providedIn: 'root' })
export class CrmContactTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crm-contact-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crmContactType: NewCrmContactType): Observable<EntityResponseType> {
    return this.http.post<ICrmContactType>(this.resourceUrl, crmContactType, { observe: 'response' });
  }

  update(crmContactType: ICrmContactType): Observable<EntityResponseType> {
    return this.http.put<ICrmContactType>(`${this.resourceUrl}/${this.getCrmContactTypeIdentifier(crmContactType)}`, crmContactType, {
      observe: 'response',
    });
  }

  partialUpdate(crmContactType: PartialUpdateCrmContactType): Observable<EntityResponseType> {
    return this.http.patch<ICrmContactType>(`${this.resourceUrl}/${this.getCrmContactTypeIdentifier(crmContactType)}`, crmContactType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrmContactType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrmContactType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCrmContactTypeIdentifier(crmContactType: Pick<ICrmContactType, 'id'>): number {
    return crmContactType.id;
  }

  compareCrmContactType(o1: Pick<ICrmContactType, 'id'> | null, o2: Pick<ICrmContactType, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrmContactTypeIdentifier(o1) === this.getCrmContactTypeIdentifier(o2) : o1 === o2;
  }

  addCrmContactTypeToCollectionIfMissing<Type extends Pick<ICrmContactType, 'id'>>(
    crmContactTypeCollection: Type[],
    ...crmContactTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crmContactTypes: Type[] = crmContactTypesToCheck.filter(isPresent);
    if (crmContactTypes.length > 0) {
      const crmContactTypeCollectionIdentifiers = crmContactTypeCollection.map(
        crmContactTypeItem => this.getCrmContactTypeIdentifier(crmContactTypeItem)!
      );
      const crmContactTypesToAdd = crmContactTypes.filter(crmContactTypeItem => {
        const crmContactTypeIdentifier = this.getCrmContactTypeIdentifier(crmContactTypeItem);
        if (crmContactTypeCollectionIdentifiers.includes(crmContactTypeIdentifier)) {
          return false;
        }
        crmContactTypeCollectionIdentifiers.push(crmContactTypeIdentifier);
        return true;
      });
      return [...crmContactTypesToAdd, ...crmContactTypeCollection];
    }
    return crmContactTypeCollection;
  }
}
