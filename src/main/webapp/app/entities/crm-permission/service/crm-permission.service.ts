import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICrmPermission, NewCrmPermission } from '../crm-permission.model';

export type PartialUpdateCrmPermission = Partial<ICrmPermission> & Pick<ICrmPermission, 'id'>;

export type EntityResponseType = HttpResponse<ICrmPermission>;
export type EntityArrayResponseType = HttpResponse<ICrmPermission[]>;

@Injectable({ providedIn: 'root' })
export class CrmPermissionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crm-permissions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crmPermission: NewCrmPermission): Observable<EntityResponseType> {
    return this.http.post<ICrmPermission>(this.resourceUrl, crmPermission, { observe: 'response' });
  }

  update(crmPermission: ICrmPermission): Observable<EntityResponseType> {
    return this.http.put<ICrmPermission>(`${this.resourceUrl}/${this.getCrmPermissionIdentifier(crmPermission)}`, crmPermission, {
      observe: 'response',
    });
  }

  partialUpdate(crmPermission: PartialUpdateCrmPermission): Observable<EntityResponseType> {
    return this.http.patch<ICrmPermission>(`${this.resourceUrl}/${this.getCrmPermissionIdentifier(crmPermission)}`, crmPermission, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrmPermission>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrmPermission[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCrmPermissionIdentifier(crmPermission: Pick<ICrmPermission, 'id'>): number {
    return crmPermission.id;
  }

  compareCrmPermission(o1: Pick<ICrmPermission, 'id'> | null, o2: Pick<ICrmPermission, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrmPermissionIdentifier(o1) === this.getCrmPermissionIdentifier(o2) : o1 === o2;
  }

  addCrmPermissionToCollectionIfMissing<Type extends Pick<ICrmPermission, 'id'>>(
    crmPermissionCollection: Type[],
    ...crmPermissionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crmPermissions: Type[] = crmPermissionsToCheck.filter(isPresent);
    if (crmPermissions.length > 0) {
      const crmPermissionCollectionIdentifiers = crmPermissionCollection.map(
        crmPermissionItem => this.getCrmPermissionIdentifier(crmPermissionItem)!
      );
      const crmPermissionsToAdd = crmPermissions.filter(crmPermissionItem => {
        const crmPermissionIdentifier = this.getCrmPermissionIdentifier(crmPermissionItem);
        if (crmPermissionCollectionIdentifiers.includes(crmPermissionIdentifier)) {
          return false;
        }
        crmPermissionCollectionIdentifiers.push(crmPermissionIdentifier);
        return true;
      });
      return [...crmPermissionsToAdd, ...crmPermissionCollection];
    }
    return crmPermissionCollection;
  }
}
