import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICrmDocType, NewCrmDocType } from '../crm-doc-type.model';

export type PartialUpdateCrmDocType = Partial<ICrmDocType> & Pick<ICrmDocType, 'id'>;

export type EntityResponseType = HttpResponse<ICrmDocType>;
export type EntityArrayResponseType = HttpResponse<ICrmDocType[]>;

@Injectable({ providedIn: 'root' })
export class CrmDocTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crm-doc-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crmDocType: NewCrmDocType): Observable<EntityResponseType> {
    return this.http.post<ICrmDocType>(this.resourceUrl, crmDocType, { observe: 'response' });
  }

  update(crmDocType: ICrmDocType): Observable<EntityResponseType> {
    return this.http.put<ICrmDocType>(`${this.resourceUrl}/${this.getCrmDocTypeIdentifier(crmDocType)}`, crmDocType, {
      observe: 'response',
    });
  }

  partialUpdate(crmDocType: PartialUpdateCrmDocType): Observable<EntityResponseType> {
    return this.http.patch<ICrmDocType>(`${this.resourceUrl}/${this.getCrmDocTypeIdentifier(crmDocType)}`, crmDocType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrmDocType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrmDocType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCrmDocTypeIdentifier(crmDocType: Pick<ICrmDocType, 'id'>): number {
    return crmDocType.id;
  }

  compareCrmDocType(o1: Pick<ICrmDocType, 'id'> | null, o2: Pick<ICrmDocType, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrmDocTypeIdentifier(o1) === this.getCrmDocTypeIdentifier(o2) : o1 === o2;
  }

  addCrmDocTypeToCollectionIfMissing<Type extends Pick<ICrmDocType, 'id'>>(
    crmDocTypeCollection: Type[],
    ...crmDocTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crmDocTypes: Type[] = crmDocTypesToCheck.filter(isPresent);
    if (crmDocTypes.length > 0) {
      const crmDocTypeCollectionIdentifiers = crmDocTypeCollection.map(crmDocTypeItem => this.getCrmDocTypeIdentifier(crmDocTypeItem)!);
      const crmDocTypesToAdd = crmDocTypes.filter(crmDocTypeItem => {
        const crmDocTypeIdentifier = this.getCrmDocTypeIdentifier(crmDocTypeItem);
        if (crmDocTypeCollectionIdentifiers.includes(crmDocTypeIdentifier)) {
          return false;
        }
        crmDocTypeCollectionIdentifiers.push(crmDocTypeIdentifier);
        return true;
      });
      return [...crmDocTypesToAdd, ...crmDocTypeCollection];
    }
    return crmDocTypeCollection;
  }
}
