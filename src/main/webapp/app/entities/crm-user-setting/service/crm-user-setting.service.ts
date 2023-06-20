import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICrmUserSetting, NewCrmUserSetting } from '../crm-user-setting.model';

export type PartialUpdateCrmUserSetting = Partial<ICrmUserSetting> & Pick<ICrmUserSetting, 'id'>;

export type EntityResponseType = HttpResponse<ICrmUserSetting>;
export type EntityArrayResponseType = HttpResponse<ICrmUserSetting[]>;

@Injectable({ providedIn: 'root' })
export class CrmUserSettingService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crm-user-settings');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crmUserSetting: NewCrmUserSetting): Observable<EntityResponseType> {
    return this.http.post<ICrmUserSetting>(this.resourceUrl, crmUserSetting, { observe: 'response' });
  }

  update(crmUserSetting: ICrmUserSetting): Observable<EntityResponseType> {
    return this.http.put<ICrmUserSetting>(`${this.resourceUrl}/${this.getCrmUserSettingIdentifier(crmUserSetting)}`, crmUserSetting, {
      observe: 'response',
    });
  }

  partialUpdate(crmUserSetting: PartialUpdateCrmUserSetting): Observable<EntityResponseType> {
    return this.http.patch<ICrmUserSetting>(`${this.resourceUrl}/${this.getCrmUserSettingIdentifier(crmUserSetting)}`, crmUserSetting, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrmUserSetting>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrmUserSetting[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCrmUserSettingIdentifier(crmUserSetting: Pick<ICrmUserSetting, 'id'>): number {
    return crmUserSetting.id;
  }

  compareCrmUserSetting(o1: Pick<ICrmUserSetting, 'id'> | null, o2: Pick<ICrmUserSetting, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrmUserSettingIdentifier(o1) === this.getCrmUserSettingIdentifier(o2) : o1 === o2;
  }

  addCrmUserSettingToCollectionIfMissing<Type extends Pick<ICrmUserSetting, 'id'>>(
    crmUserSettingCollection: Type[],
    ...crmUserSettingsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crmUserSettings: Type[] = crmUserSettingsToCheck.filter(isPresent);
    if (crmUserSettings.length > 0) {
      const crmUserSettingCollectionIdentifiers = crmUserSettingCollection.map(
        crmUserSettingItem => this.getCrmUserSettingIdentifier(crmUserSettingItem)!
      );
      const crmUserSettingsToAdd = crmUserSettings.filter(crmUserSettingItem => {
        const crmUserSettingIdentifier = this.getCrmUserSettingIdentifier(crmUserSettingItem);
        if (crmUserSettingCollectionIdentifiers.includes(crmUserSettingIdentifier)) {
          return false;
        }
        crmUserSettingCollectionIdentifiers.push(crmUserSettingIdentifier);
        return true;
      });
      return [...crmUserSettingsToAdd, ...crmUserSettingCollection];
    }
    return crmUserSettingCollection;
  }
}
