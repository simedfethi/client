import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICrmRole, NewCrmRole } from '../crm-role.model';

export type PartialUpdateCrmRole = Partial<ICrmRole> & Pick<ICrmRole, 'id'>;

export type EntityResponseType = HttpResponse<ICrmRole>;
export type EntityArrayResponseType = HttpResponse<ICrmRole[]>;

@Injectable({ providedIn: 'root' })
export class CrmRoleService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crm-roles');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crmRole: NewCrmRole): Observable<EntityResponseType> {
    return this.http.post<ICrmRole>(this.resourceUrl, crmRole, { observe: 'response' });
  }

  update(crmRole: ICrmRole): Observable<EntityResponseType> {
    return this.http.put<ICrmRole>(`${this.resourceUrl}/${this.getCrmRoleIdentifier(crmRole)}`, crmRole, { observe: 'response' });
  }

  partialUpdate(crmRole: PartialUpdateCrmRole): Observable<EntityResponseType> {
    return this.http.patch<ICrmRole>(`${this.resourceUrl}/${this.getCrmRoleIdentifier(crmRole)}`, crmRole, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrmRole>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrmRole[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCrmRoleIdentifier(crmRole: Pick<ICrmRole, 'id'>): number {
    return crmRole.id;
  }

  compareCrmRole(o1: Pick<ICrmRole, 'id'> | null, o2: Pick<ICrmRole, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrmRoleIdentifier(o1) === this.getCrmRoleIdentifier(o2) : o1 === o2;
  }

  addCrmRoleToCollectionIfMissing<Type extends Pick<ICrmRole, 'id'>>(
    crmRoleCollection: Type[],
    ...crmRolesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crmRoles: Type[] = crmRolesToCheck.filter(isPresent);
    if (crmRoles.length > 0) {
      const crmRoleCollectionIdentifiers = crmRoleCollection.map(crmRoleItem => this.getCrmRoleIdentifier(crmRoleItem)!);
      const crmRolesToAdd = crmRoles.filter(crmRoleItem => {
        const crmRoleIdentifier = this.getCrmRoleIdentifier(crmRoleItem);
        if (crmRoleCollectionIdentifiers.includes(crmRoleIdentifier)) {
          return false;
        }
        crmRoleCollectionIdentifiers.push(crmRoleIdentifier);
        return true;
      });
      return [...crmRolesToAdd, ...crmRoleCollection];
    }
    return crmRoleCollection;
  }
}
